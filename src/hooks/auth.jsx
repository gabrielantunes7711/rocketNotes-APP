import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password, setLoading }) {
    try {
      setLoading((prevState) => !prevState);
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;
      const userData = {
        avatar: user.avatar,
        name: user.name,
        email: user.email,
      };

      localStorage.setItem("@rocketnotes:user", JSON.stringify(userData));
      localStorage.setItem("@rocketnotes:token", token);

      api.defaults.headers.common["authorization"] = `Bearer ${token}`;
      setData({ user: userData, token });
    } catch (error) {
      setLoading((prevState) => !prevState);
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar.");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@rocketnotes:token");
    localStorage.removeItem("@rocketnotes:user");

    setData({});
  }

  async function updateProfile({ user, avatarFile }) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData();

        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
      }

      await api.put("/users", user);

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));

      setData({ user, token: data.token });

      alert("Perfil Atualizado!");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível atualizar o perfil.");
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token");
    const user = localStorage.getItem("@rocketnotes:user");

    if (token && user) {
      api.defaults.headers.common["authorization"] = `Bearer ${token}`;

      setData({ token, user: JSON.parse(user) });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, user: data.user, signOut, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };

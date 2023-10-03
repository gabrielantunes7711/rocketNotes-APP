import { Container, Profile } from "./style";
import { RiShutDownLine } from "react-icons/ri";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import profilePlaceholder from "../../assets/avatar_placeholder.svg";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : profilePlaceholder;

  function handleSignOut() {
    signOut();

    navigate("/");
  }

  return (
    <Container>
      <Profile to="/profile">
        <img src={avatarUrl} alt="Foto do usuário" />
        <div>
          <span>Bem-vindo</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>

      <button onClick={handleSignOut}>
        <RiShutDownLine />
      </button>
    </Container>
  );
};

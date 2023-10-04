import { FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";

import { Background, Container, Form } from "./styles";
import { useState } from "react";
import { Loading } from "../../components/Loading/Loading";

export const SignIn = () => {
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  function handleSignIn() {
    signIn({ email, password, setLoading });
  }

  return (
    <Container>
      {loading && <Loading />}

      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis</p>
        <h2>Faça seu login</h2>

        <Input
          placeholder="E-mail"
          type="email"
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button label="Entrar" onClick={handleSignIn} />

        <Link to="/register">Criar conta</Link>
      </Form>

      <Background />
    </Container>
  );
};

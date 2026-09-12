import {
  useState,
  type FormEvent
} from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { realizarLogin } from "../services/auth.service";
import { useAuth } from "../contexts/AuthContext";

const Page = styled.main`
  min-height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f6f8;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 32px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 480px) {
    padding: 24px;
  }
`;

const Input = styled.input`
  padding: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 14px;
  border: none;
  border-radius: 8px;

  background: #2563eb;
  color: white;

  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: #dc2626;
`;

function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const { entrar } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setErro("");

      const resposta = await realizarLogin({
        email,
        senha
      });

      entrar(
        resposta.usuario,
        resposta.token
      );

      navigate("/admin");

    } catch (error) {
      console.error(error);

      setErro(
        "Email ou senha inválidos."
      );
    }
  }

  return (
    <Page>

      <Form onSubmit={handleSubmit}>

        <h1>Login do Professor</h1>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
        />

        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(event) =>
            setSenha(event.target.value)
          }
        />

        {erro && (
          <ErrorMessage>
            {erro}
          </ErrorMessage>
        )}

        <Button type="submit">
          Entrar
        </Button>

      </Form>

    </Page>
  );
}

export default Login;
import { api } from "./api";

interface LoginData {
  email: string;
  senha: string;
}

interface LoginResponse {
  mensagem: string;
  token: string;

  usuario: {
    nome: string;
    email: string;
  };
}

export async function realizarLogin(
  dados: LoginData
): Promise<LoginResponse> {
  const resposta = await api.post<LoginResponse>(
    "/login",
    dados
  );

  return resposta.data;
}
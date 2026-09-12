import { api } from "./api";
import type { Post } from "../types/Post";

export async function listarPosts(): Promise<Post[]> {
  const resposta = await api.get<Post[]>("/posts");

  return resposta.data;
}

export async function buscarPosts(termo: string): Promise<Post[]> {
  const resposta = await api.get<Post[]>("/posts/search", {
    params: {
      termo
    }
  });

  return resposta.data;
}

export async function buscarPostPorId(id: number): Promise<Post> {
  const resposta = await api.get<Post>(`/posts/${id}`);

  return resposta.data;
}

export async function excluirPost(
  id: number,
  token: string
): Promise<void> {
  await api.delete(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

interface PostInput {
  titulo: string;
  conteudo: string;
  autor: string;
}

export async function criarPost(
  dados: PostInput,
  token: string
): Promise<Post> {
  const resposta = await api.post<Post>(
    "/posts",
    dados,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return resposta.data;
}

export async function atualizarPost(
  id: number,
  dados: PostInput,
  token: string
): Promise<Post> {
  const resposta = await api.put<Post>(
    `/posts/${id}`,
    dados,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return resposta.data;
}
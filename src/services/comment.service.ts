import { api } from "./api";
import type { Comment } from "../types/Comment";

interface CommentInput {
  autor: string;
  conteudo: string;
}

export async function listarComentarios(
  postId: number
): Promise<Comment[]> {
  const resposta = await api.get<Comment[]>(
    `/posts/${postId}/comentarios`
  );

  return resposta.data;
}

export async function criarComentario(
  postId: number,
  dados: CommentInput
): Promise<Comment> {
  const resposta = await api.post<Comment>(
    `/posts/${postId}/comentarios`,
    dados
  );

  return resposta.data;
}

export async function excluirComentario(
  postId: number,
  comentarioId: number,
  token: string
): Promise<void> {
  await api.delete(
    `/posts/${postId}/comentarios/${comentarioId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}
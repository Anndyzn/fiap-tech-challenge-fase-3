import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import { buscarPostPorId } from "../services/post.service";
import {
  listarComentarios,
  criarComentario
} from "../services/comment.service";

import type { Post } from "../types/Post";
import type { Comment } from "../types/Comment";

const Page = styled.main`
  min-height: 100vh;
  background: #f4f6f8;
  padding: 48px 20px;
`;

const Container = styled.article`
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 10px;
  padding: 32px;

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 24px;
  color: #2563eb;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  color: #111827;
  font-size: 36px;
  margin-bottom: 12px;

  @media (max-width: 600px) {
    font-size: 28px;
  }
`;

const Author = styled.p`
  color: #6b7280;
  margin-bottom: 28px;
`;

const Content = styled.p`
  color: #374151;
  line-height: 1.8;
  font-size: 17px;
  white-space: pre-wrap;
`;

const Message = styled.p`
  padding: 40px;
  color: #6b7280;
`;

const CommentsSection = styled.section`
  width: 100%;
  max-width: 850px;
  margin: 32px auto 0;
  background: #ffffff;
  border-radius: 10px;
  padding: 32px;

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const CommentsTitle = styled.h2`
  margin-bottom: 24px;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const Textarea = styled.textarea`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const CommentButton = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CommentItem = styled.article`
  padding: 16px 0;
  border-top: 1px solid #e5e7eb;
`;

const CommentAuthor = styled.strong`
  display: block;
  margin-bottom: 6px;
`;

const CommentContent = styled.p`
  color: #4b5563;
  line-height: 1.5;
`;

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [comentarios, setComentarios] =
    useState<Comment[]>([]);

  const [nomeComentario, setNomeComentario] =
    useState("");

  const [textoComentario, setTextoComentario] =
    useState("");

  const [enviandoComentario, setEnviandoComentario] =
    useState(false);

  useEffect(() => {
    async function carregarPost() {
      try {
        if (!id) {
          setErro("Postagem inválida.");
          return;
        }

        const postId = Number(id);

        const dados = await buscarPostPorId(postId);
        setPost(dados);

        const comentariosDoPost =
          await listarComentarios(postId);

        setComentarios(comentariosDoPost);

      } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar a postagem.");
      } finally {
        setCarregando(false);
      }
    }

    carregarPost();
  }, [id]);

  async function handleComentario(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!post) {
      return;
    }

    if (
      !nomeComentario.trim() ||
      !textoComentario.trim()
    ) {
      alert("Preencha seu nome e o comentário.");
      return;
    }

    try {
      setEnviandoComentario(true);

      const novoComentario =
        await criarComentario(post.id, {
          autor: nomeComentario,
          conteudo: textoComentario
        });

      setComentarios((comentariosAtuais) => [
        novoComentario,
        ...comentariosAtuais
      ]);

      setNomeComentario("");
      setTextoComentario("");

    } catch (error) {
      console.error(error);

      alert(
        "Não foi possível enviar o comentário."
      );
    } finally {
      setEnviandoComentario(false);
    }
  }

  if (carregando) {
    return (
      <Message>
        Carregando postagem...
      </Message>
    );
  }

  if (erro || !post) {
    return (
      <Message>
        {erro || "Postagem não encontrada."}
      </Message>
    );
  }

  return (
    <Page>

      <Container>
        <BackLink to="/">
          ← Voltar para postagens
        </BackLink>

        <Title>
          {post.titulo}
        </Title>

        <Author>
          Autor: {post.autor}
        </Author>

        <Content>
          {post.conteudo}
        </Content>
      </Container>

      <CommentsSection>

        <CommentsTitle>
          Comentários
        </CommentsTitle>

        <CommentForm onSubmit={handleComentario}>

          <Input
            type="text"
            placeholder="Seu nome"
            value={nomeComentario}
            onChange={(event) =>
              setNomeComentario(event.target.value)
            }
          />

          <Textarea
            rows={4}
            placeholder="Escreva seu comentário..."
            value={textoComentario}
            onChange={(event) =>
              setTextoComentario(event.target.value)
            }
          />

          <CommentButton
            type="submit"
            disabled={enviandoComentario}
          >
            {enviandoComentario
              ? "Enviando..."
              : "Enviar comentário"}
          </CommentButton>

        </CommentForm>

        {comentarios.length === 0 ? (
          <p>
            Ainda não existem comentários.
          </p>
        ) : (
          comentarios.map((comentario) => (
            <CommentItem key={comentario.id}>

              <CommentAuthor>
                {comentario.autor}
              </CommentAuthor>

              <CommentContent>
                {comentario.conteudo}
              </CommentContent>

            </CommentItem>
          ))
        )}

      </CommentsSection>

    </Page>
  );
}

export default PostDetails;
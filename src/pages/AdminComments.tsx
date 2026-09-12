import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import {
  listarComentarios,
  excluirComentario
} from "../services/comment.service";

import { useAuth } from "../contexts/AuthContext";

import type { Comment } from "../types/Comment";

const Page = styled.main`
  min-height: 100vh;
  background: #f4f6f8;
  padding: 40px 20px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
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
  margin-bottom: 28px;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CommentItem = styled.article`
  background: white;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
`;

const Author = styled.strong`
  display: block;
  margin-bottom: 8px;
`;

const Content = styled.p`
  color: #4b5563;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const DeleteButton = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  background: #dc2626;
  color: white;
  cursor: pointer;
`;

const Message = styled.p`
  color: #6b7280;
`;

function AdminComments() {
  const { id } = useParams();

  const { token } = useAuth();

  const [comentarios, setComentarios] =
    useState<Comment[]>([]);

  const [carregando, setCarregando] =
    useState(true);

  const [erro, setErro] =
    useState("");

  useEffect(() => {
    async function carregarComentarios() {
      if (!id) {
        return;
      }

      try {
        const dados =
          await listarComentarios(Number(id));

        setComentarios(dados);
      } catch (error) {
        console.error(error);

        setErro(
          "Não foi possível carregar os comentários."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarComentarios();
  }, [id]);

  async function handleExcluir(
    comentarioId: number
  ) {
    if (!id || !token) {
      return;
    }

    const confirmar = window.confirm(
      "Deseja realmente excluir este comentário?"
    );

    if (!confirmar) {
      return;
    }

    try {
      await excluirComentario(
        Number(id),
        comentarioId,
        token
      );

      setComentarios((comentariosAtuais) =>
        comentariosAtuais.filter(
          (comentario) =>
            comentario.id !== comentarioId
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        "Não foi possível excluir o comentário."
      );
    }
  }

  return (
    <Page>
      <Container>

        <BackLink to="/admin">
          ← Voltar para o painel
        </BackLink>

        <Title>
          Comentários da postagem
        </Title>

        {carregando ? (
          <Message>
            Carregando comentários...
          </Message>
        ) : erro ? (
          <Message>{erro}</Message>
        ) : comentarios.length === 0 ? (
          <Message>
            Esta postagem ainda não possui comentários.
          </Message>
        ) : (
          <CommentList>

            {comentarios.map((comentario) => (
              <CommentItem key={comentario.id}>

                <Author>
                  {comentario.autor}
                </Author>

                <Content>
                  {comentario.conteudo}
                </Content>

                <DeleteButton
                  onClick={() =>
                    handleExcluir(comentario.id)
                  }
                >
                  Excluir comentário
                </DeleteButton>

              </CommentItem>
            ))}

          </CommentList>
        )}

      </Container>
    </Page>
  );
}

export default AdminComments;
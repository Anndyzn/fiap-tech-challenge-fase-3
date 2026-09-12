import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import { buscarPostPorId } from "../services/post.service";
import type { Post } from "../types/Post";

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

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarPost() {
      try {
        if (!id) {
          setErro("Postagem inválida.");
          return;
        }

        const dados = await buscarPostPorId(Number(id));

        setPost(dados);
      } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar a postagem.");
      } finally {
        setCarregando(false);
      }
    }

    carregarPost();
  }, [id]);

  if (carregando) {
    return <Message>Carregando postagem...</Message>;
  }

  if (erro || !post) {
    return <Message>{erro || "Postagem não encontrada."}</Message>;
  }

  return (
    <Page>
      <Container>
        <BackLink to="/">← Voltar para postagens</BackLink>

        <Title>{post.titulo}</Title>

        <Author>Autor: {post.autor}</Author>

        <Content>{post.conteudo}</Content>
      </Container>
    </Page>
  );
}

export default PostDetails;
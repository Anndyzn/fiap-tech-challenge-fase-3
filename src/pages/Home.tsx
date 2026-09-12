import { useEffect, useState } from "react";
import styled from "styled-components";

import PostCard from "../components/PostCard";
import {
  listarPosts,
  buscarPosts
} from "../services/post.service";

import type { Post } from "../types/Post";

const Page = styled.main`
  min-height: 100vh;
  background: #f4f6f8;
  padding: 48px 20px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.header`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  color: #111827;
  font-size: 36px;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 16px;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 14px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #2563eb;
  }
`;

const SearchButton = styled.button`
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;

const PostsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Message = styled.p`
  color: #6b7280;
  margin-top: 24px;
`;

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarPosts() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await listarPosts();

      setPosts(dados);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar as postagens.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarPosts();
  }, []);

  async function handleBuscar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setCarregando(true);
      setErro("");

      if (!termoBusca.trim()) {
        await carregarPosts();
        return;
      }

      const dados = await buscarPosts(termoBusca);

      setPosts(dados);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível realizar a busca.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Page>
      <Container>
        <Header>
          <Title>Blog Educacional</Title>

          <Subtitle>
            Conteúdos e postagens disponibilizados pelos professores.
          </Subtitle>
        </Header>

        <SearchForm onSubmit={handleBuscar}>
          <SearchInput
            type="text"
            placeholder="Buscar postagens..."
            value={termoBusca}
            onChange={(event) => setTermoBusca(event.target.value)}
          />

          <SearchButton type="submit">
            Buscar
          </SearchButton>
        </SearchForm>

        {carregando ? (
          <Message>Carregando postagens...</Message>
        ) : erro ? (
          <Message>{erro}</Message>
        ) : posts.length === 0 ? (
          <Message>Nenhuma postagem encontrada.</Message>
        ) : (
          <PostsGrid>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))}
          </PostsGrid>
        )}
      </Container>
    </Page>
  );
}

export default Home;
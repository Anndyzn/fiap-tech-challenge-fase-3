import { useEffect, useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../contexts/AuthContext";
import {
  listarPosts,
  excluirPost
} from "../services/post.service";

import type { Post } from "../types/Post";

const Page = styled.main`
  min-height: 100vh;
  background: #f4f6f8;
  padding: 40px 20px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

const NewPostButton = styled(Link)`
  background: #2563eb;
  color: white;
  padding: 12px 18px;
  border-radius: 8px;
  text-decoration: none;
`;

const LogoutButton = styled.button`
  border: 1px solid #d1d5db;
  background: white;
  padding: 12px 18px;
  border-radius: 8px;
  cursor: pointer;
`;

const CommentsButton = styled(Link)`
  padding: 10px 16px;
  background: #2563eb;
  color: white;
  border-radius: 6px;
  text-decoration: none;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PostItem = styled.article`
  background: white;
  padding: 24px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PostInfo = styled.div`
  flex: 1;
`;

const PostTitle = styled.h2`
  color: #111827;
  margin-bottom: 8px;
`;

const Author = styled.p`
  color: #6b7280;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const EditButton = styled(Link)`
  padding: 10px 16px;
  background: #f59e0b;
  color: white;
  border-radius: 6px;
  text-decoration: none;
`;

const DeleteButton = styled.button`
  padding: 10px 16px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const Message = styled.p`
  color: #6b7280;
`;

function Admin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const {
    usuario,
    token,
    sair
  } = useAuth();

  const navigate = useNavigate();

  async function carregarPosts() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await listarPosts();

      setPosts(dados);
    } catch (error) {
      console.error(error);

      setErro(
        "Não foi possível carregar as postagens."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarPosts();
  }, []);

  async function handleExcluir(id: number) {
    if (!token) {
      return;
    }

    const confirmar = window.confirm(
      "Deseja realmente excluir esta postagem?"
    );

    if (!confirmar) {
      return;
    }

    try {
      await excluirPost(id, token);

      setPosts((postsAtuais) =>
        postsAtuais.filter(
          (post) => post.id !== id
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        "Não foi possível excluir a postagem."
      );
    }
  }

  function handleSair() {
    sair();
    navigate("/");
  }

  return (
    <Page>
      <Container>

        <Header>
          <div>
            <h1>Painel Administrativo</h1>

            <p>
              Bem-vindo, {usuario?.nome}
            </p>
          </div>

          <HeaderActions>
            <NewPostButton to="/admin/posts/novo">
              + Nova postagem
            </NewPostButton>

            <LogoutButton onClick={handleSair}>
              Sair
            </LogoutButton>
          </HeaderActions>
        </Header>

        {carregando ? (
          <Message>
            Carregando postagens...
          </Message>
        ) : erro ? (
          <Message>{erro}</Message>
        ) : posts.length === 0 ? (
          <Message>
            Nenhuma postagem cadastrada.
          </Message>
        ) : (
          <PostList>
            {posts.map((post) => (
              <PostItem key={post.id}>

                <PostInfo>
                  <PostTitle>
                    {post.titulo}
                  </PostTitle>

                  <Author>
                    Autor: {post.autor}
                  </Author>
                </PostInfo>

                <Actions>

                  <CommentsButton
                    to={`/admin/posts/${post.id}/comentarios`}
                  >
                    Comentários
                  </CommentsButton>

                  <EditButton
                    to={`/admin/posts/${post.id}/editar`}
                  >
                    Editar
                  </EditButton>

                  <DeleteButton
                    onClick={() =>
                      handleExcluir(post.id)
                    }
                  >
                    Excluir
                  </DeleteButton>

                </Actions>

              </PostItem>
            ))}
          </PostList>
        )}

      </Container>
    </Page>
  );
}

export default Admin;
import styled from "styled-components";
import type { Post } from "../types/Post";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: Post;
}

const Card = styled.article`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 24px;
  transition: 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  }
`;

const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 12px;
  color: #111827;
`;

const Content = styled.p`
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 16px;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Author = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
`;

const ReadMore = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function PostCard({ post }: PostCardProps) {
  return (
    <Card>
      <Title>{post.titulo}</Title>

      <Content>{post.conteudo}</Content>

      <Author>Autor: {post.autor}</Author>

      <ReadMore to={`/posts/${post.id}`}>
        Ler postagem →
      </ReadMore>
    </Card>
  );
}

export default PostCard;
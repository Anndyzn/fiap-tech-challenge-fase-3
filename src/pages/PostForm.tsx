import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  type FieldProps
} from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import { useAuth } from "../contexts/AuthContext";
import {
  buscarPostPorId,
  criarPost,
  atualizarPost
} from "../services/post.service";

const Page = styled.main`
  min-height: 100vh;
  background: #f4f6f8;
  padding: 40px 20px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  background: white;
  padding: 32px;
  border-radius: 10px;

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const TopActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const BackLink = styled(Link)`
  color: #2563eb;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledField = styled(Field)`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const StyledTextarea = styled.textarea`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const Button = styled.button`
  padding: 14px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const ErrorText = styled.div`
  color: #dc2626;
  font-size: 14px;
`;

interface FormValues {
  titulo: string;
  conteudo: string;
  autor: string;
}

const validationSchema = Yup.object({
  titulo: Yup.string().required("Título é obrigatório."),
  conteudo: Yup.string().required("Conteúdo é obrigatório."),
  autor: Yup.string().required("Autor é obrigatório.")
});

function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const editando = Boolean(id);

  const [valoresIniciais, setValoresIniciais] = useState<FormValues>({
    titulo: "",
    conteudo: "",
    autor: ""
  });

  const [carregando, setCarregando] = useState(editando);

  useEffect(() => {
    async function carregarPost() {
      if (!id) {
        return;
      }

      try {
        const post = await buscarPostPorId(Number(id));

        setValoresIniciais({
          titulo: post.titulo,
          conteudo: post.conteudo,
          autor: post.autor
        });
      } finally {
        setCarregando(false);
      }
    }

    carregarPost();
  }, [id]);

  async function handleSubmit(values: FormValues) {
    if (!token) {
      return;
    }

    if (editando && id) {
      await atualizarPost(Number(id), values, token);
    } else {
      await criarPost(values, token);
    }

    navigate("/admin");
  }

  if (carregando) {
    return <p>Carregando postagem...</p>;
  }

  return (
    <Page>
      <Container>

        <TopActions>
          <BackLink to="/admin">
            ← Voltar para o painel
          </BackLink>

        </TopActions>
        <h1>
          {editando ? "Editar postagem" : "Nova postagem"}
        </h1>

        <Formik
          initialValues={valoresIniciais}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <StyledForm>
            <label htmlFor="titulo">Título</label>

            <StyledField
              id="titulo"
              name="titulo"
              placeholder="Digite o título"
            />

            <ErrorMessage
              name="titulo"
              component={ErrorText}
            />

            <label htmlFor="conteudo">
              Conteúdo
            </label>
            <Field name="conteudo">
              {({ field, meta }: FieldProps<string>) => (
                <>
                  <StyledTextarea
                    {...field}
                    id="conteudo"
                    rows={8}
                    placeholder="Digite o conteúdo"
                  />

                  {meta.touched && meta.error && (
                    <ErrorText>
                      {meta.error}
                    </ErrorText>
                  )}
                </>
              )}
            </Field>

            <label htmlFor="autor">Autor</label>

            <StyledField
              id="autor"
              name="autor"
              placeholder="Digite o autor"
            />

            <ErrorMessage
              name="autor"
              component={ErrorText}
            />

            <Button type="submit">
              {editando ? "Salvar alterações" : "Criar postagem"}
            </Button>
          </StyledForm>
        </Formik>
      </Container>
    </Page>
  );
}

export default PostForm;
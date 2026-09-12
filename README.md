# 🚀 Tech Challenge FIAP - Fase 3

## Blog Educacional - Front-end

Projeto desenvolvido para o **Tech Challenge da Fase 3 da Pós Tech Full Stack Development - FIAP**.

Nesta fase foi desenvolvido o front-end em **React** para consumir a API criada na Fase 2.

A aplicação permite que alunos visualizem e pesquisem postagens, enquanto professores autenticados podem criar, editar e excluir conteúdos.

---

# 🛠️ Tecnologias

- React
- TypeScript
- Vite
- Axios
- React Router
- Styled Components
- Context API
- Formik
- Yup
- Docker
- GitHub Actions

---

# 📁 Estrutura

```text
src/
├── components/
├── contexts/
├── pages/
├── services/
├── types/
├── App.tsx
└── main.tsx
```

O projeto foi separado em componentes, páginas, serviços de comunicação com a API e contexto de autenticação.

---

# 🏗️ Arquitetura

```text
Usuário
   ↓
React
localhost:5173
   ↓
API Node.js / Express
localhost:4000
   ↓
PostgreSQL
```

O front-end utiliza **Axios** para consumir os endpoints criados na Fase 2.

---

# 🌐 Funcionalidades

### Alunos

- Visualizar postagens;
- Pesquisar por palavras-chave;
- Ler o conteúdo completo;
- Visualizar e adicionar comentários.

### Professores

- Realizar login;
- Acessar o painel administrativo;
- Criar postagens;
- Editar postagens;
- Excluir postagens;
- Visualizar e excluir comentários.

---

# 📡 Principais Rotas

| Rota | Função |
|---|---|
| `/` | Lista e pesquisa de postagens |
| `/posts/:id` | Leitura completa |
| `/login` | Login do professor |
| `/admin` | Painel administrativo |
| `/admin/posts/novo` | Criar postagem |
| `/admin/posts/:id/editar` | Editar postagem |

---

# 🔐 Autenticação

O professor realiza login para acessar as funções administrativas.

Para demonstração:

```text
Email: professor@fiap.com
Senha: 123456
```

Após o login, o token retornado pela API é armazenado no front-end e utilizado nas rotas protegidas.

---

# ⚙️ Como Executar

Clone o repositório:

```bash
git clone https://github.com/Anndyzn/fiap-tech-challenge-fase-3.git
```

Entre na pasta:

```bash
cd fiap-tech-challenge-fase-3
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:5173
```

O back-end da Fase 2 também deve estar rodando em:

```text
http://localhost:4000
```

---

# 🐳 Docker

Criar a imagem:

```bash
docker build -t fiap-tech-challenge-fase-3 .
```

Executar o container:

```bash
docker run -d -p 8080:4173 --name frontend_fiap fiap-tech-challenge-fase-3
```

Acesse:

```text
http://localhost:8080
```

---

# ⚙️ GitHub Actions

Foi configurado um workflow de CI que executa automaticamente:

```text
npm ci
↓
npm run build
```

Assim, a cada atualização do projeto é verificado se o front-end continua compilando corretamente.

---

# 📱 Responsividade

A aplicação foi desenvolvida para funcionar em computadores e dispositivos móveis utilizando **Styled Components** e media queries.

---

# ⚠️ Dificuldades e Aprendizados

Durante o desenvolvimento os principais desafios foram integrar o React com o back-end, trabalhar com React Router, Context API, autenticação, formulários e Docker.

O projeto ajudou a reforçar os conteúdos estudados durante a Fase 3 e a entender melhor a integração entre front-end e back-end.

---

# 👨‍💻 Autor

**Andy Minoru Higa Arias**

Turma: **Pós Tech - 9FSDT**

Full Stack Development - FIAP

Front-end:
```text
https://github.com/Anndyzn/fiap-tech-challenge-fase-3
```

Back-end:
```text
https://github.com/Anndyzn/fiap-tech-challenge-fase-2
```

**2026**

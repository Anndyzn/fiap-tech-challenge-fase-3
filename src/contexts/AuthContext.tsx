import {
  createContext,
  useContext,
  useState,
  type ReactNode
} from "react";

interface Usuario {
  nome: string;
  email: string;
}

interface AuthContextData {
  usuario: Usuario | null;
  token: string | null;
  autenticado: boolean;

  entrar: (
    usuario: Usuario,
    token: string
  ) => void;

  sair: () => void;
}

const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children
}: AuthProviderProps) {

  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const usuarioSalvo = localStorage.getItem("usuario");

    if (!usuarioSalvo) {
      return null;
    }

    return JSON.parse(usuarioSalvo);
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  function entrar(
    usuarioRecebido: Usuario,
    tokenRecebido: string
  ) {
    setUsuario(usuarioRecebido);
    setToken(tokenRecebido);

    localStorage.setItem(
      "usuario",
      JSON.stringify(usuarioRecebido)
    );

    localStorage.setItem(
      "token",
      tokenRecebido
    );
  }

  function sair() {
    setUsuario(null);
    setToken(null);

    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        autenticado: !!token,
        entrar,
        sair
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
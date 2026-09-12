import { Link } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../contexts/AuthContext";

const HeaderContainer = styled.header`
  background: #111827;
  color: white;
  padding: 16px 20px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Logo = styled(Link)`
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 16px;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const NavLink = styled(Link)`
  color: #e5e7eb;
  text-decoration: none;

  &:hover {
    color: white;
  }
`;

function Header() {
  const { autenticado } = useAuth();

  return (
    <HeaderContainer>
      <Container>

        <Logo to="/">
          Blog FIAP
        </Logo>

        <Navigation>
          <NavLink to="/">
            Postagens
          </NavLink>

          {autenticado ? (
            <NavLink to="/admin">
              Administração
            </NavLink>
          ) : (
            <NavLink to="/login">
              Login Professor
            </NavLink>
          )}
        </Navigation>

      </Container>
    </HeaderContainer>
  );
}

export default Header;
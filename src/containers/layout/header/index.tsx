import { FC, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Theme, useMediaQuery } from "@mui/material";

import { ROUTES } from "../../../utils/constants";
import Logo from "../../../assets/images/logo.svg";

import S from "./header.styled";
import authContext from "../../../utils/context/authContext";

const Header: FC = () => {
  const { pathname }: { pathname: string } = useLocation();
  const strs = window.location.pathname.split("/");
  const id = strs.at(-1);

  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const [navOpen, setNavOpen] = useState(false);
  const { setIsAuthenticated } = useContext(authContext);
  const navigate = useNavigate();
  return (
    <S.Header>
      <S.LogoBox>
        <S.Logo src={Logo} alt="Nerkathir Logo" onClick={() => navigate("/dashboard")} />
        <S.LogoText>
          நெற்கதிர் உழவர் <br /> உற்பத்தியாளர் நிறுவனம்
        </S.LogoText>
      </S.LogoBox>
      <S.NavBar isOpen={navOpen}>
        {isMd ? (
          <S.NavBarMenu>
            Menu <i onClick={() => setNavOpen(false)}>close</i>
          </S.NavBarMenu>
        ) : null}
        {ROUTES.map((route) => (
          <S.NavLink to={`./${route.route}`} isActive={pathname === `/${route.route}`} key={route.route}>
            <S.NavLinkText isActive={pathname === `/${route.route}`}>{route.name}</S.NavLinkText>
          </S.NavLink>
        ))}
      </S.NavBar>
      <S.ActionsBox>
        <i>account</i>
        <i
          onClick={() => {
            setIsAuthenticated(false);
            window.localStorage.removeItem("isAuthenticated");
          }}
        >
          logout
        </i>
        {isMd ? <i onClick={() => setNavOpen(true)}>menu</i> : null}
      </S.ActionsBox>
    </S.Header>
  );
};

export default Header;

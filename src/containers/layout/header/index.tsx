import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Theme, useMediaQuery } from "@mui/material";

import { ROUTES } from "../../../utils/constants";
import Logo from "../../../assets/images/logo.svg";
import { useAuthContext } from "../../../utils/context/authContext";

import S from "./header.styled";

const Header: FC = () => {
  let { pathname } = useLocation();
  pathname = pathname.split("/")[1];

  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const [navOpen, setNavOpen] = useState(false);
  const { logout } = useAuthContext();
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
          <S.NavLink to={`./${route.route}`} isActive={pathname === `${route.route}`} key={route.route}>
            <S.NavLinkText isActive={pathname === `${route.route}`}>{route.name}</S.NavLinkText>
          </S.NavLink>
        ))}
      </S.NavBar>
      <S.ActionsBox>
        <i>account</i>
        <i onClick={logout}>logout</i>
        {isMd ? <i onClick={() => setNavOpen(true)}>menu</i> : null}
      </S.ActionsBox>
    </S.Header>
  );
};

export default Header;

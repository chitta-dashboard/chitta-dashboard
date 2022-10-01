import { FC, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Theme, useMediaQuery } from "@mui/material";

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
        <S.NavLink to="./dashboard" isActive={pathname === "/dashboard"}>
          <S.NavLinkText isActive={pathname === "/dashboard"}>Dashboard</S.NavLinkText>
        </S.NavLink>
        <S.NavLink to="./ceo-details" isActive={pathname === "/ceo-details"}>
          <S.NavLinkText isActive={pathname === "/ceo-details"}>CEO Details</S.NavLinkText>
        </S.NavLink>
        <S.NavLink to="./md-details" isActive={pathname === "/md-details"}>
          <S.NavLinkText isActive={pathname === "/md-details"}>MD Details</S.NavLinkText>
        </S.NavLink>
        <S.NavLink to="./farmers-group" isActive={pathname === "/farmers-group"}>
          <S.NavLinkText isActive={pathname === "/farmers-group"}>Farmers Group</S.NavLinkText>
        </S.NavLink>
        <S.NavLink to="./farmers-details" isActive={pathname === "/farmers-details"}>
          <S.NavLinkText isActive={[`/farmers-details/${id}`, "/farmers-details"].includes(pathname)}>Farmers Details</S.NavLinkText>
        </S.NavLink>
        <S.NavLink to="./cultivation" isActive={pathname === "/cultivation"}>
          <S.NavLinkText isActive={pathname === "/cultivation"}>Cultivation</S.NavLinkText>
        </S.NavLink>
        <S.NavLink to="./register" isActive={pathname === "/register"}>
          <S.NavLinkText isActive={pathname === "/register"}>Register</S.NavLinkText>
        </S.NavLink>
        <S.NavLink to="./decisions" isActive={pathname === "/decisions"}>
          <S.NavLinkText isActive={pathname === "/decisions"}>Decisions</S.NavLinkText>
        </S.NavLink>
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

import React, { FC, useState } from "react";
import { S } from "./header.styled";
import Logo from "../../../assets/images/logo.svg";
import Profile from "../../../assets/images/profile.svg";
import Logout from "../../../assets/images/logout.svg";
import Hamburger from "../../../assets/images/hamburger.svg";
import Close from "../../../assets/images/close.svg";
import { useLocation } from "react-router-dom";
import { Theme, useMediaQuery } from "@mui/material";

const Header: FC = () => {
  const { pathname }: { pathname: string } = useLocation();
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const [navOpen, setNavOpen ] = useState(false)

  return (
    <S.Header>
      <S.LogoBox>
        <S.Logo src={Logo} alt="Nerkathir Logo" />
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
          <S.NavLinkText isActive={pathname === "/dashboard"}>
            Dashboard
          </S.NavLinkText>
        </S.NavLink>
        <S.NavLink to="./ceo-details" isActive={pathname === "/ceo-details"}>
          <S.NavLinkText isActive={pathname === "/ceo-details"}>
            CEO Details
          </S.NavLinkText>
        </S.NavLink>
        <S.NavLink to="./md-details" isActive={pathname === "/md-details"}>
          <S.NavLinkText isActive={pathname === "/md-details"}>
            MD Details
          </S.NavLinkText>
        </S.NavLink>
        <S.NavLink to="./farmers-group" isActive={pathname === "/farmers-group"}>
          <S.NavLinkText isActive={pathname === "/farmers-group"}>
            Farmers Group
          </S.NavLinkText>
        </S.NavLink>
        <S.NavLink to="./farmers-details" isActive={pathname === "/farmers-details"}>
          <S.NavLinkText isActive={pathname === "/farmers-details"}>
            Farmers Details
          </S.NavLinkText>
        </S.NavLink>
        <S.NavLink to="./cultivation" isActive={pathname === "/cultivation"}>
          <S.NavLinkText isActive={pathname === "/cultivation"}>
            Cultivation
          </S.NavLinkText>
        </S.NavLink>
        <S.NavLink to="./register" isActive={pathname === "/register"}>
          <S.NavLinkText isActive={pathname === "/register"}>
            Register
          </S.NavLinkText>
        </S.NavLink>
        <S.NavLink to="./decisions" isActive={pathname === "/decisions"}>
          <S.NavLinkText isActive={pathname === "/decisions"}>
            Decisions
          </S.NavLinkText>
        </S.NavLink>
      </S.NavBar>
      <S.ActionsBox>
        <i>account</i>
        <i>logout</i>
        {isMd ? <i onClick={() => setNavOpen(true)}>menu</i> : null}
      </S.ActionsBox>
    </S.Header>
  );
};

export default Header;

import React, { FC } from "react";
import { S } from "./header.styled";
import Logo from "../../../assets/images/logo.svg";
import Profile from "../../../assets/images/profile.svg";
import Logout from "../../../assets/images/logout.svg";
import { useLocation } from "react-router-dom";

const Header: FC = () => {
  const { pathname }: { pathname: string } = useLocation();

  return (
    <S.Header>
      <S.LogoBox>
        <S.Logo src={Logo} alt="Nerkathir Logo" />
        <S.LogoText>
          நெற்கதிர் உழவர் <br /> உற்பத்தியாளர் நிறுவனம்
        </S.LogoText>
      </S.LogoBox>
      <S.NavBar>
        <S.NavItem to="./dashboard" isActive={pathname === '/dashboard'}>Dashboard</S.NavItem>
        <S.NavItem to="./ceo-details" isActive={pathname === '/ceo-details'}>CEO Details</S.NavItem>
        <S.NavItem to="./md-details" isActive={pathname === '/md-details'}>MD Details</S.NavItem>
        <S.NavItem to="./farmers-group" isActive={pathname === '/farmers-group'}>Farmers Group</S.NavItem>
        <S.NavItem to="./farmers-details" isActive={pathname === '/farmers-details'}>Farmers Details</S.NavItem>
        <S.NavItem to="./cultivation" isActive={pathname === '/cultivation'}>Cultivation</S.NavItem>
        <S.NavItem to="./register" isActive={pathname === '/register'}>Register</S.NavItem>
        <S.NavItem to="./decisions" isActive={pathname === '/decisions'}>Decisions</S.NavItem>
      </S.NavBar>
      <S.ActionsBox>
        <img src={Profile} alt="Profile" />
        <img src={Logout} alt="Logout" />
      </S.ActionsBox>
    </S.Header>
  );
};

export default Header;

import React, { useState } from "react";

import SearchBar from "../../common-components/search-bar";
import SearchModal from "../../icon-modals/searchModal.tsx";

import profilePic from "../../../assets/images/profile.png";
import { Box } from "@mui/material";
import { S } from "./dashboardHeader.styled";
import IconWrapper from "../../../utils/iconWrapper"; 


type Props = {};

const DashboardHeader = (props: Props) => {
  const [openSearch, setOpenSearch] = useState(false);
  const openSearchHandle = () => {
    setOpenSearch(!openSearch);
  };
  return (
    <>
      <SearchModal open={openSearch} handleClose={openSearchHandle} />
      <S.DashboardHeaderWrapper>
        <S.ProfileBox>
          <S.ImgContainer>
            <S.DshboardImg src={profilePic} alt="user-profile" />
          </S.ImgContainer>
          <Box>
            <S.ProfileHeading>Hi, Arockia!</S.ProfileHeading>
            <S.ProfileSubHeading>Welcome Back.</S.ProfileSubHeading>
          </Box>
        </S.ProfileBox>
        <S.HeaderIconsBox>
          <S.SearchBarContainer>
          <SearchBar />
          </S.SearchBarContainer>
          <IconWrapper>filter</IconWrapper>
          <IconWrapper>settings</IconWrapper>
          <S.SearchIconContainer>
            <IconWrapper onClick={openSearchHandle}>search</IconWrapper>
          </S.SearchIconContainer>
        </S.HeaderIconsBox>
      </S.DashboardHeaderWrapper>
    </>
  );
};

export default DashboardHeader;

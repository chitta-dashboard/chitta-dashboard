import React from "react";

import profilePic from "../../../assets/images/profile.png";
import { Box } from "@mui/material";

import SearchBar from "../../common-components/search-bar";
import { S } from "./dashboardHeader.styled";
import IconWrapper from "../../../utils/iconWrapper";
import CommonIconModal from "../../common-icon-modal";

type Props = {};

const DashboardHeader = (props: Props) => {
  return (
    <>
      <S.DashboardHeaderWrapper>
        <S.ProfileBox>
          <S.ImgContainer>
            <img src={profilePic} alt="user-profile" />
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
            <IconWrapper>search</IconWrapper>
          </S.SearchIconContainer>
        </S.HeaderIconsBox>
      </S.DashboardHeaderWrapper>
    </>
  );
};

export default DashboardHeader;

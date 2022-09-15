import React, { FC } from "react";
import { Typography } from "@mui/material";
import { S } from "./footer.styled";

const Footer: FC = () => {
  return (
    <S.FooterContainer>
      <Typography> App Footer</Typography>
    </S.FooterContainer>
  );
};

export default Footer;

import React, { FC } from "react";

import S from "./footer.styled";

const Footer: FC = () => {
  return (
    <S.Footer>
      <S.InfoBar>
        <S.InfoText>REG No:139086</S.InfoText>
        <S.InfoText>CIN:UO1409TN2020PTC139086</S.InfoText>
      </S.InfoBar>
      <S.ArticleBar>
        <S.ArticleText>About</S.ArticleText>
        <S.ArticleText>Blog</S.ArticleText>
        <S.ArticleText>Help</S.ArticleText>
        <S.ArticleText>Terms & Conditions</S.ArticleText>
      </S.ArticleBar>
    </S.Footer>
  );
};

export default Footer;

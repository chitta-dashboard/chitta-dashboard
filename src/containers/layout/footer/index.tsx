import { FC } from "react";
import { useAuthContext } from "../../../utils/context/auth";
import S from "./footer.styled";

const Footer: FC = () => {
  const { regNo, cinNo } = useAuthContext();
  return (
    <S.Footer>
      <S.InfoBar>
        <S.InfoText>{regNo ? `REG No:${regNo}` : "REG No:139086"}</S.InfoText>
        <S.InfoText>{cinNo ? `CIN:${cinNo}` : "CIN:UO1409TN2020PTC139086"}</S.InfoText>
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

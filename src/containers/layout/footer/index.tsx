import { FC } from "react";
import S from "./footer.styled";
import { ENDPOINTS } from "../../../utils/constants";
import { useFetch } from "../../../utils/hooks/query";
import { AdminFormInputs } from "../../../views/admin-panel";

const Footer: FC = () => {
  // Queries
  const {
    formatChangeSuccess: isSuccess,
    result: { data: adminDetails },
  } = useFetch(ENDPOINTS.admin);

  const { regNo, cinNo } = isSuccess && Object.values(adminDetails as AdminFormInputs)[0];

  return (
    <>
      {isSuccess && (
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
      )}
    </>
  );
};

export default Footer;

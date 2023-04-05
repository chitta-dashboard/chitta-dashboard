import { FC } from "react";
import { ENDPOINTS } from "../../../utils/constants";
import { useFetch } from "../../../utils/hooks/query";
import { AdminFormInputs } from "../../../views/admin-panel";
import S from "./footer.styled";

const Footer: FC = () => {
  //constants
  const {
    formatChangeSuccess: isAdminSuccess,
    result: { data: adminDetails },
  } = useFetch(ENDPOINTS.admin);

  //state values
  const { regNo, cinNo } = isAdminSuccess && Object.values(adminDetails as AdminFormInputs)[0];

  return (
    <>
      {isAdminSuccess && (
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

import { FC } from "react";
import { ENDPOINTS } from "../../../utils/constants";
import { useFetch } from "../../../utils/hooks/query";
import { AdminFormInputs } from "../../../views/admin-panel";
import S from "./footer.styled";

const Footer: FC = () => {
  //constants
  const {
    formatChangeSuccess: isSuccess,
    result: { data: adminDetails },
  } = useFetch(ENDPOINTS.admin);

  //state values
  const { regNo, cinNo } =
    isSuccess && Boolean(Object.values(adminDetails).length) ? Object.values(adminDetails as AdminFormInputs)[0] : ({} as AdminFormInputs);

  return (
    <>
      <S.Footer>
        <S.InfoBar>
          <S.InfoText>{isSuccess && regNo ? `REG No:${regNo}` : "REG No:139086"}</S.InfoText>
          <S.InfoText>{isSuccess && cinNo ? `CIN:${cinNo}` : "CIN:UO1409TN2020PTC139086"}</S.InfoText>
        </S.InfoBar>
        <S.ArticleBar>
          <S.ArticleText>About</S.ArticleText>
          <S.ArticleText>Blog</S.ArticleText>
          <S.ArticleText>Help</S.ArticleText>
          <S.ArticleText>Terms & Conditions</S.ArticleText>
        </S.ArticleBar>
      </S.Footer>
    </>
  );
};

export default Footer;

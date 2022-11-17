import { FC } from "react";
import PortfolioItems from "../portfolio-items";
import S from "./portfolioContent.styled";

const PortfolioContent: FC = () => {
  return (
    <S.PortfolioContentContainer>
      <PortfolioItems />
    </S.PortfolioContentContainer>
  );
};

export default PortfolioContent;

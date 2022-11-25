import { FC } from "react";
import PortfolioAnimal from "../portfolio-animal";
import PortfolioProcessed from "../portfolio-processed";
import PortfolioRaw from "../portfolio-raw";
import S from "./portfolioContent.styled";
interface Props {
  tab: string;
}

const PortfolioContent: FC<Props> = ({ tab }) => {
  const tabHandler = () => {
    switch (tab) {
      case "Raw":
        return <PortfolioRaw tab={tab} />;
      case "Processed":
        return <PortfolioProcessed tab={tab} />;
      case "Animal":
        return <PortfolioAnimal tab={tab} />;
    }
  };
  return <S.PortfolioContentContainer>{tabHandler()}</S.PortfolioContentContainer>;
};

export default PortfolioContent;

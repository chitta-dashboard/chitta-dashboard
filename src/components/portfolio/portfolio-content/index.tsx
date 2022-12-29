import { FC } from "react";
import PortfolioAnimal from "../portfolio-animal";
import PortfolioProcessed from "../portfolio-processed";
import PortfolioRaw from "../portfolio-raw";
import S from "./portfolioContent.styled";
interface Props {
  tab: string;
  clearSearchHandler: () => void;
}

const PortfolioContent: FC<Props> = ({ tab, clearSearchHandler }) => {
  const tabHandler = () => {
    switch (tab) {
      case "Raw":
        return <PortfolioRaw tab={tab} clearSearchHandler={clearSearchHandler} />;
      case "Processed":
        return <PortfolioProcessed clearSearchHandler={clearSearchHandler} />;
      case "Animal":
        return <PortfolioAnimal clearSearchHandler={clearSearchHandler} />;
    }
  };
  return <S.PortfolioContentContainer>{tabHandler()}</S.PortfolioContentContainer>;
};

export default PortfolioContent;

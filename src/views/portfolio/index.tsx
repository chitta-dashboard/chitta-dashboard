import { useState } from "react";
import PortfolioContent from "../../components/portfolio/portfolio-content";
import PortfolioHeader from "../../components/portfolio/portfolio-header";
import S from "./portfolio.styled";

const Portfolio = () => {
  const [tab, setTab] = useState<string>("Raw");
  return (
    <S.Portfolio>
      <PortfolioHeader tab={tab} setTab={setTab} />
      <PortfolioContent tab={tab} />
    </S.Portfolio>
  );
};

export default Portfolio;

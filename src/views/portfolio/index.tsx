import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchFilter } from "../../utils/store/slice/portfolio";
import PortfolioContent from "../../components/portfolio/portfolio-content";
import PortfolioHeader from "../../components/portfolio/portfolio-header";
import S from "./portfolio.styled";

const Portfolio = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState<string>("Raw");

  const handleSearchInput = (searchText: string) => {
    dispatch(setSearchFilter(searchText));
  };

  return (
    <S.Portfolio>
      <PortfolioHeader tab={tab} setTab={setTab} searchHandler={handleSearchInput} />
      <PortfolioContent tab={tab} />
    </S.Portfolio>
  );
};

export default Portfolio;

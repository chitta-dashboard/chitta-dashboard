import { useRef, useState } from "react";
import { usePortfolioContext } from "../../utils/context/portfolio";
import PortfolioContent from "../../components/portfolio/portfolio-content";
import PortfolioHeader from "../../components/portfolio/portfolio-header";
import S from "./portfolio.styled";

const Portfolio = () => {
  //state values
  const { setSearchFilter } = usePortfolioContext();
  const [tab, setTab] = useState<string>("Raw");

  //constants
  const searchRef = useRef<HTMLInputElement>(null);

  //functions
  const handleSearchInput = (searchText: string) => {
    setSearchFilter(searchText);
  };

  const clearSearchHandler = () => {
    if (searchRef.current != null) {
      searchRef.current.value = "";
    }
  };

  return (
    <S.Portfolio>
      <PortfolioHeader tab={tab} setTab={setTab} searchHandler={handleSearchInput} searchRef={searchRef} />
      <PortfolioContent tab={tab} clearSearchHandler={clearSearchHandler} />
    </S.Portfolio>
  );
};

export default Portfolio;

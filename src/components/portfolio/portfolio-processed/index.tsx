import { FC, useEffect } from "react";
import { usePortfolioContext } from "../../../utils/context/portfolio";
import S from "./portfolioProcessed.styled";
interface Props {
  clearSearchHandler: () => void;
}
const PortfolioProcessed: FC<Props> = ({ clearSearchHandler }) => {
  //state values
  const { setSearchFilter } = usePortfolioContext();

  useEffect(() => {
    clearSearchHandler();
    setSearchFilter("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <S.PortfolioProcessed>No processed products added yet, add some.</S.PortfolioProcessed>;
};
export default PortfolioProcessed;

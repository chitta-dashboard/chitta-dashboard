import { FC, useEffect } from "react";
import S from "./portfolioAnimal.styled";
import { usePortfolioContext } from "../../../utils/context/portfolio";

interface Props {
  clearSearchHandler: () => void;
}
const PortfolioAnimal: FC<Props> = ({ clearSearchHandler }) => {
  // state values
  const { setSearchFilter } = usePortfolioContext();

  useEffect(() => {
    clearSearchHandler();
    setSearchFilter("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <S.PortfolioAnimal>No animal products added yet, add some.</S.PortfolioAnimal>;
};
export default PortfolioAnimal;

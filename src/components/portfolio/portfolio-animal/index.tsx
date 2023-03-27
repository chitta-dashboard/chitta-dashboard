import { FC, useEffect } from "react";
import { usePortfolioContext } from "../../../utils/context/portfolio";
import S from "./portfolioAnimal.styled";
interface Props {
  clearSearchHandler: () => void;
}
const PortfolioAnimal: FC<Props> = ({ clearSearchHandler }) => {
  //state values
  const { setSearchFilter } = usePortfolioContext();

  useEffect(() => {
    clearSearchHandler();
    setSearchFilter("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <S.PortfolioAnimal>No animal products added yet, add some.</S.PortfolioAnimal>;
};
export default PortfolioAnimal;

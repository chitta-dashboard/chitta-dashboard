import { FC } from "react";
import S from "./portfolioAnimal.styled";
interface Props{
  tab:string
}
const PortfolioAnimal:FC<Props> = ({tab}) => {
  return <S.PortfolioAnimal>No animal products added yet, add some.</S.PortfolioAnimal>;
};
export default PortfolioAnimal;

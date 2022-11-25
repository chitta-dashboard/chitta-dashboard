import { FC } from "react";
import S from "./portfolioProcessed.styled";
interface Props {
  tab: string;
}
const PortfolioProcessed:FC <Props> = ({ tab }) => {
  return <S.PortfolioProcessed>No processed products added yet, add some.</S.PortfolioProcessed>;
};
export default PortfolioProcessed;

import { FC, useMemo } from "react";
import { ENDPOINTS } from "../../../utils/constants";
import { useFetch } from "../../../utils/hooks/query";
import Loader from "../../../utils/loaders/tree-loader";
import ItemCard, { IPortfolioProduct } from "../item-card";
import S from "./portfolioRaw.styled";
interface Props {
  tab: string;
}
const PortfolioRaw: FC<Props> = ({ tab }) => {
  const {
    formatChangeSuccess,
    result: { data },
  } = useFetch(ENDPOINTS.portfolioRaw);

  const portfolioData: IPortfolioProduct[] | undefined = useMemo(() => {
    if (formatChangeSuccess) return Object.values(data);
  }, [formatChangeSuccess, data]);

  if (!formatChangeSuccess)
    return (
      <S.LoaderWrapper>
        <Loader />
      </S.LoaderWrapper>
    );

  return (
    <S.PortfolioRaw>
      {portfolioData?.length === 0 && <S.NoDataMessage>No Raw Products</S.NoDataMessage>}
      {portfolioData?.map((data) => (
        <ItemCard key={data.id} data={data}></ItemCard>
      ))}
    </S.PortfolioRaw>
  );
};

export default PortfolioRaw;

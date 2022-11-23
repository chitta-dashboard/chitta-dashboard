import { useMemo } from "react";
import { ENDPOINTS } from "../../../utils/constants";
import { useFetch } from "../../../utils/hooks/query";
import Loader from "../../../utils/loaders/tree-loader";
import ItemCard, { IPortfolioProduct } from "../item-card";
import S from "./portfolioItems.styled";

const PortfolioItems = () => {
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
    <S.PortfolioItems>
      {portfolioData?.length === 0 && <S.NoDataMessage>No Raw Products</S.NoDataMessage>}
      {portfolioData?.map((data) => (
        <ItemCard key={data.id} data={data}></ItemCard>
      ))}
    </S.PortfolioItems>
  );
};

export default PortfolioItems;

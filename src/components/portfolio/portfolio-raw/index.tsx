import { FC, useEffect, useState } from "react";
import { ENDPOINTS, searchWord } from "../../../utils/constants";
import { usePortfolioContext } from "../../../utils/context/portfolio";
import { useFetch } from "../../../utils/hooks/query";
import Loader from "../../../utils/loaders/tree-loader";
import ItemCard, { IPortfolioProduct } from "../item-card";
import S from "./portfolioRaw.styled";
interface Props {
  tab: string;
  clearSearchHandler: () => void;
}
const PortfolioRaw: FC<Props> = ({ tab, clearSearchHandler }) => {
  //constants
  const {
    formatChangeSuccess: isRawSuccess,
    result: { data: rawProducts, isFetching },
  } = useFetch(ENDPOINTS.portfolioRaw);

  //state values
  const { searchFilter, setSearchFilter } = usePortfolioContext();
  const [rawProductSearch, setRawProductSearchSearch] = useState<IPortfolioProduct[]>(isRawSuccess && rawProducts ? Object.values(rawProducts) : []);

  useEffect(() => {
    let result = Object.values(isRawSuccess && rawProducts ? (rawProducts as IPortfolioProduct[]) : []).filter((product) =>
      searchWord(product.productName, searchFilter),
    );
    isRawSuccess && setRawProductSearchSearch(result);
  }, [searchFilter, isRawSuccess, rawProducts]);

  useEffect(() => {
    clearSearchHandler();
    setSearchFilter("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isRawSuccess && isFetching ? (
        <S.LoaderWrapper>
          <Loader />
        </S.LoaderWrapper>
      ) : isRawSuccess && rawProducts ? (
        <S.PortfolioRaw>
          {rawProductSearch?.length === 0 && <S.NoDataMessage>No Raw Products.</S.NoDataMessage>}
          {rawProductSearch?.map((rawProduct) => (
            <ItemCard key={rawProduct.id} data={rawProduct}></ItemCard>
          ))}
        </S.PortfolioRaw>
      ) : (
        <S.NoDataMessage>No Raw Products.</S.NoDataMessage>
      )}
    </>
  );
};

export default PortfolioRaw;

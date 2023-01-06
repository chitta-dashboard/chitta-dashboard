import { FC, useEffect, useState } from "react";
import S from "./portfolioRaw.styled";
import { ENDPOINTS, searchWord } from "../../../utils/constants";
import { usePortfolioContext } from "../../../utils/context/portfolio";
import { useFetch } from "../../../utils/hooks/query";
import Loader from "../../../utils/loaders/tree-loader";
import ItemCard, { IPortfolioProduct } from "../item-card";

interface Props {
  tab: string;
  clearSearchHandler: () => void;
}
const PortfolioRaw: FC<Props> = ({ tab, clearSearchHandler }) => {
  // Queries
  const {
    formatChangeSuccess: isRawSuccess,
    result: { data: rawProducts },
  } = useFetch(ENDPOINTS.portfolioRaw);
  // state values
  const { searchFilter, setSearchFilter } = usePortfolioContext();
  const [rawProductSearch, setRawProductSearchSearch] = useState<IPortfolioProduct[]>(isRawSuccess ? Object.values(rawProducts) : []);

  useEffect(() => {
    let result = Object.values(isRawSuccess && (rawProducts as IPortfolioProduct[])).filter((product) =>
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
      {!isRawSuccess ? (
        <S.LoaderWrapper>
          <Loader />
        </S.LoaderWrapper>
      ) : (
        <S.PortfolioRaw>
          {rawProductSearch?.length === 0 && <S.NoDataMessage>No Raw Products.</S.NoDataMessage>}
          {rawProductSearch?.map((rawProduct) => (
            <ItemCard key={rawProduct.id} data={rawProduct}></ItemCard>
          ))}
        </S.PortfolioRaw>
      )}
    </>
  );
};

export default PortfolioRaw;

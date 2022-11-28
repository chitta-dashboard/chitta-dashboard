import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ENDPOINTS, searchWord } from "../../../utils/constants";
import { useFetch } from "../../../utils/hooks/query";
import Loader from "../../../utils/loaders/tree-loader";
import ItemCard, { IPortfolioProduct } from "../item-card";
import S from "./portfolioRaw.styled";
interface Props {
  tab: string;
}
const PortfolioRaw: FC<Props> = ({ tab }) => {
  const {
    formatChangeSuccess: isRawSuccess,
    result: { data: rawProducts },
  } = useFetch(ENDPOINTS.portfolioRaw);

  const { searchFilter } = useSelector((state: any) => state.portfolio);
  const [rawProductSearch, setRawProductSearchSearch] = useState<IPortfolioProduct[]>(isRawSuccess ? Object.values(rawProducts) : []);

  useEffect(() => {
    let result = Object.values(isRawSuccess && (rawProducts as IPortfolioProduct[])).filter((product) =>
      searchWord(product.productName, searchFilter),
    );
    isRawSuccess && setRawProductSearchSearch(result);
  }, [searchFilter, isRawSuccess, rawProducts]);

  return (
    <>
      {!isRawSuccess ? (
        <S.LoaderWrapper>
          <Loader />
        </S.LoaderWrapper>
      ) : (
        <S.PortfolioRaw>
          {rawProductSearch?.length === 0 && <S.NoDataMessage>No Raw Products</S.NoDataMessage>}
          {rawProductSearch?.map((rawProduct) => (
            <ItemCard key={rawProduct.id} data={rawProduct}></ItemCard>
          ))}
        </S.PortfolioRaw>
      )}
    </>
  );
};

export default PortfolioRaw;

import { useEffect } from "react";
import { Founders, useFounderContext } from "../../../../utils/context/founders";
import { ENDPOINTS } from "../../../../utils/constants";
import { useFetchByPage } from "../../../../utils/hooks/query";
import BodyWrapper from "../../../custom-tables/body";
import FoundersRow from "./row";
import S from "./body.styled";
import { useSearchQuery, useSortQuery } from "../../../../utils/helpers";

const Body = () => {
  const { searchFilter, sortFilter, currentPage, setPageCount, setFounderQuery } = useFounderContext();
  const searchQuery = useSearchQuery(searchFilter, "name");
  const sortQuery = useSortQuery(sortFilter, "name");
  const groupQuery = "";
  const dataLimit = 7;

  const {
    result: { data: founderByPage, refetch: foundergroupRefetch, isFetched: isFounderByPageSuccess },
    dataCount: totalDataCount,
  } = useFetchByPage(ENDPOINTS.founders, currentPage, `${searchQuery}${groupQuery}${sortQuery}`, dataLimit);

  // const { formatChangeSuccess: isSuccess, result } = useFetch(ENDPOINTS.founders);
  // const { data: foundersData } = result;
  // const [founderSearch, setFounderSearch] = useState<Founders[]>(isSuccess ? Object.values(foundersData) : []);
  // const [founderSort, setFounderSort] = useState<Founders[]>(isSuccess ? Object.values(foundersData) : []);
  // const [founder, setFounder] = useState<Founders[]>(isSuccess ? Object.values(foundersData) : []);

  // useEffect(() => {
  //   isSuccess && setFounderSearch(Object.values(foundersData as Founders[]).filter((list) => searchWord(list.name, searchFilter)));
  // }, [isSuccess, foundersData, searchFilter]);

  // useEffect(() => {
  //   setFounderSort(sortObj<Founders>(founderSearch, sortFilter, "name"));
  // }, [founderSearch, sortFilter]);

  // useEffect(() => {
  //   setFounder(founderSort);
  // }, [founderSort]);

  useEffect(() => {
    setPageCount({ pageCount: Math.ceil(totalDataCount / dataLimit), totalPageCount: totalDataCount });
  }, [totalDataCount, founderByPage]);

  useEffect(() => {
    foundergroupRefetch();
    setFounderQuery(`${searchQuery}${groupQuery}${sortQuery}`);
  }, [searchFilter, sortFilter, currentPage]);

  return (
    <>
      {isFounderByPageSuccess && Object.values(founderByPage).length > 0 ? (
        <BodyWrapper>
          {isFounderByPageSuccess &&
            Object.values(founderByPage as Founders[]).map((user) => (
              <FoundersRow {...{ user }} key={user.id} params={`${searchQuery}${groupQuery}${sortQuery}`} />
            ))}
        </BodyWrapper>
      ) : (
        <S.EmptyMsg>
          <tr>
            <td>No Founders..</td>
          </tr>
        </S.EmptyMsg>
      )}
    </>
  );
};

export default Body;

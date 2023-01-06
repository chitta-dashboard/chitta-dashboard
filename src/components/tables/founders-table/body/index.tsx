import { useEffect } from "react";
import S from "./body.styled";
import { ENDPOINTS } from "../../../../utils/constants";
import { Founders, useFounderContext } from "../../../../utils/context/founders";
import { useSearchQuery, useSortQuery } from "../../../../utils/helpers";
import { useFetchByPage } from "../../../../utils/hooks/query";
import BodyWrapper from "../../../custom-tables/body";
import FoundersRow from "./row";

const Body = () => {
  // state values
  const { searchFilter, sortFilter, currentPage, setPageCount, setFounderQuery } = useFounderContext();
  const searchQuery = useSearchQuery(searchFilter, "name");
  const sortQuery = useSortQuery(sortFilter, "name");
  const groupQuery = "";
  const dataLimit = 7;
  // Queries
  const {
    result: { data: founderByPage, refetch: foundergroupRefetch, isFetched: isFounderByPageSuccess },
    dataCount: totalDataCount,
  } = useFetchByPage(ENDPOINTS.founders, currentPage, `${searchQuery}${groupQuery}${sortQuery}`, dataLimit);

  useEffect(() => {
    setPageCount({ pageCount: Math.ceil(totalDataCount / dataLimit), totalPageCount: totalDataCount });
  }, [totalDataCount, founderByPage]);

  useEffect(() => {
    foundergroupRefetch();
    setFounderQuery(`${searchQuery}${groupQuery}${sortQuery}`);
  }, [searchFilter, sortFilter, currentPage]);

  return (
    <>
      {isFounderByPageSuccess && founderByPage.length > 0 ? (
        <BodyWrapper>
          {isFounderByPageSuccess &&
            founderByPage.map((user: Founders) => <FoundersRow {...{ user }} key={user.id} params={`${searchQuery}${groupQuery}${sortQuery}`} />)}
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

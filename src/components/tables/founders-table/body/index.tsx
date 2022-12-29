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

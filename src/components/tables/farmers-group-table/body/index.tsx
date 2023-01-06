import { useEffect } from "react";
import S from "./body.styled";
import { ENDPOINTS } from "../../../../utils/constants";
import { FarmersGroup, useFarmersGroupContext } from "../../../../utils/context/farmersGroup";
import { useSearchQuery, useSortQuery } from "../../../../utils/helpers";
import { useFetchByPage } from "../../../../utils/hooks/query";
import BodyWrapper from "../../../custom-tables/body";
import FarmersGroupRow from "./row";

const Body = () => {
  // state values
  const { searchFilter, sortFilter, currentPage, setFarmerGroupQuery, setPageCount } = useFarmersGroupContext();
  const searchQuery = useSearchQuery(searchFilter, "groupName");
  const sortQuery = useSortQuery(sortFilter, "groupName");
  const groupQuery = "";
  const dataLimit = 7;
  // Queries
  const {
    result: { data: farmerGroupByPage, refetch: farmergroupRefetch, isFetched: isFarmerByPageSuccess },
    dataCount: totalDataCount,
  } = useFetchByPage(ENDPOINTS.farmerGroup, currentPage, `${searchQuery}${groupQuery}${sortQuery}`, dataLimit);

  useEffect(() => {
    setPageCount({ pageCount: Math.ceil(totalDataCount / dataLimit), totalPageCount: totalDataCount });
  }, [totalDataCount, farmerGroupByPage]);

  useEffect(() => {
    farmergroupRefetch();
    setFarmerGroupQuery(`${searchQuery}${groupQuery}${sortQuery}`);
  }, [searchFilter, sortFilter, currentPage]);

  return (
    <>
      {isFarmerByPageSuccess && Object.values(farmerGroupByPage).length > 0 ? (
        <BodyWrapper>
          {farmerGroupByPage.map((user: FarmersGroup) => (
            <FarmersGroupRow {...{ user }} key={user.id} params={`${searchQuery}${groupQuery}${sortQuery}`} />
          ))}
        </BodyWrapper>
      ) : (
        <S.EmptyMsg>
          <tr>
            <td> No Farmers Group..</td>
          </tr>
        </S.EmptyMsg>
      )}
    </>
  );
};

export default Body;

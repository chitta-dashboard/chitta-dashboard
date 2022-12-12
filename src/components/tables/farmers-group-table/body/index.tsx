import { useEffect, useState } from "react";
import { customMemberFilter, FarmersGroup, useFarmersGroupContext } from "../../../../utils/context/farmersGroup";
import { useFetch, useFetchByPage } from "../../../../utils/hooks/query";
import { searchWord, sortObj, ENDPOINTS } from "../../../../utils/constants";
import BodyWrapper from "../../../custom-tables/body";
import FarmersGroupRow from "./row";
import S from "./body.styled";
import { useSearchQuery, useSortQuery } from "../../../../utils/helpers";

const Body = () => {
  // const { result, formatChangeSuccess: isSuccess } = useFetch(ENDPOINTS.farmerGroup);
  // const { data: farmerGroupData } = result;
  // console.log(farmerGroupData);
  const { searchFilter, sortFilter, memberFilter, currentPage, setFarmerGroupQuery, setCurrentPage, setPageCount } = useFarmersGroupContext();
  const searchQuery = useSearchQuery(searchFilter, "groupName");
  const sortQuery = useSortQuery(sortFilter, "groupName");
  const groupQuery = "";
  const dataLimit = 2;

  const {
    formatChangeSuccess: isFarmerByPageSuccess,
    result: { data: farmerGroupByPage, refetch: farmergroupRefetch },
    dataCount: totalDataCount,
  } = useFetchByPage(ENDPOINTS.farmerGroup, currentPage, `${searchQuery}${groupQuery}${sortQuery}`, dataLimit);
  // const [farmersGroupMemberList, setFarmersGroupMemberList] = useState<FarmersGroup[]>(Object.values(isSuccess ? farmerGroupData : []));
  // const [farmersGroupListSearch, setFarmersGroupListSearch] = useState<FarmersGroup[]>(Object.values(isSuccess ? farmerGroupData : []));
  // const [farmersGroupListSort, setFarmersGroupListSort] = useState<FarmersGroup[]>(Object.values(isSuccess ? farmerGroupData : []));
  // const [farmersGroupList, setFarmersGroupList] = useState<FarmersGroup[]>(Object.values(isSuccess ? farmerGroupData : []));

  // useEffect(() => {
  //   setFarmersGroupMemberList(
  //     customMemberFilter.ALL === memberFilter
  //       ? Object.values(isSuccess && (farmerGroupData as FarmersGroup[]))
  //       : customMemberFilter.WITH_MEMBERS === memberFilter
  //       ? Object.values(isSuccess && (farmerGroupData as FarmersGroup[])).filter((list) => list.members?.length !== 0)
  //       : Object.values(isSuccess && (farmerGroupData as FarmersGroup[])).filter((list) => list.members?.length === 0),
  //   );
  // }, [memberFilter, farmerGroupData, isFarmerByPageSuccess]);

  // useEffect(() => {
  //   setFarmersGroupListSearch(farmersGroupMemberList.filter((farmer) => searchWord(farmer.groupName, searchFilter)));
  // }, [searchFilter, farmersGroupMemberList, isSuccess]);

  // useEffect(() => {
  //   setFarmersGroupListSort(sortObj<FarmersGroup>(farmersGroupListSearch, sortFilter, "groupName"));
  // }, [farmersGroupListSearch, sortFilter, isSuccess]);

  // useEffect(() => {
  //   setFarmersGroupList(farmersGroupListSort);
  // }, [farmersGroupListSort, isSuccess]);
  useEffect(() => {
    setPageCount({ pageCount: Math.ceil(totalDataCount / dataLimit), totalPageCount: totalDataCount });
    totalDataCount <= dataLimit && currentPage !== 1 && setCurrentPage(1);
  }, [totalDataCount, farmerGroupByPage]);

  useEffect(() => {
    farmergroupRefetch();
    setFarmerGroupQuery(`${searchQuery}${groupQuery}${sortQuery}`);
  }, [searchFilter, sortFilter, currentPage]);

  return (
    <>
      {isFarmerByPageSuccess && Object.values(farmerGroupByPage).length > 0 ? (
        <BodyWrapper>
          {Object.values(farmerGroupByPage as FarmersGroup[]).map((user) => (
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

import { useEffect, useState } from "react";
import { customMemberFilter, FarmersGroup, useFarmersGroupContext } from "../../../../utils/context/farmersGroup";
import { useFetch } from "../../../../utils/hooks/query";
import { searchWord, sortObj, ENDPOINTS } from "../../../../utils/constants";
import BodyWrapper from "../../../custom-tables/body";
import FarmersGroupRow from "./row";
import S from "./body.styled";

const Body = () => {
  //constants
  const {
    formatChangeSuccess: isFarmerGroupSuccess,
    result: { data: farmerGroupData },
  } = useFetch(ENDPOINTS.farmerGroup);

  //state values
  const { searchFilter, sortFilter, memberFilter } = useFarmersGroupContext();
  const [farmersGroupMemberList, setFarmersGroupMemberList] = useState<FarmersGroup[]>(Object.values(isFarmerGroupSuccess ? farmerGroupData : []));
  const [farmersGroupListSearch, setFarmersGroupListSearch] = useState<FarmersGroup[]>(Object.values(isFarmerGroupSuccess ? farmerGroupData : []));
  const [farmersGroupListSort, setFarmersGroupListSort] = useState<FarmersGroup[]>(Object.values(isFarmerGroupSuccess ? farmerGroupData : []));
  const [farmersGroupList, setFarmersGroupList] = useState<FarmersGroup[]>(Object.values(isFarmerGroupSuccess ? farmerGroupData : []));

  //functions
  const memberFilterHandler = () => {
    switch (memberFilter) {
      case customMemberFilter.ALL:
        return Object.values(isFarmerGroupSuccess && (farmerGroupData as FarmersGroup[]));
      case customMemberFilter.WITH_MEMBERS:
        return Object.values(isFarmerGroupSuccess && (farmerGroupData as FarmersGroup[])).filter((list) => list.members?.length !== 0);
      default:
        return Object.values(isFarmerGroupSuccess && (farmerGroupData as FarmersGroup[])).filter((list) => list.members?.length === 0);
    }
  };
  useEffect(() => {
    setFarmersGroupMemberList(memberFilterHandler());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberFilter, farmerGroupData, isFarmerGroupSuccess]);

  useEffect(() => {
    setFarmersGroupListSearch(farmersGroupMemberList.filter((farmer) => searchWord(farmer.groupName, searchFilter)));
  }, [searchFilter, farmersGroupMemberList, isFarmerGroupSuccess]);

  useEffect(() => {
    setFarmersGroupListSort(sortObj<FarmersGroup>(farmersGroupListSearch, sortFilter, "groupName"));
  }, [farmersGroupListSearch, sortFilter, isFarmerGroupSuccess]);

  useEffect(() => {
    setFarmersGroupList(farmersGroupListSort);
  }, [farmersGroupListSort, isFarmerGroupSuccess]);

  return (
    <>
      {Boolean(farmersGroupList.length) ? (
        <BodyWrapper>
          {farmersGroupList.map((user) => (
            <FarmersGroupRow {...{ user }} key={user.id} />
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

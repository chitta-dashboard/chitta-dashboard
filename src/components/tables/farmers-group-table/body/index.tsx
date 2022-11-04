import { useEffect, useState } from "react";
import { customMemberFilter, FarmersGroup, useFarmersGroupContext } from "../../../../utils/context/farmersGroup";
import { useFetch } from "../../../../utils/hooks/query";
import { searchWord, sortObj, ENDPOINTS } from "../../../../utils/constants";
import BodyWrapper from "../../../custom-tables/body";
import FarmersGroupRow from "./row";
import S from "./body.styled";

const Body = () => {
  const { result, formatChangeSuccess: isSuccess } = useFetch(ENDPOINTS.farmerGroup);
  const { data: farmerGroupData } = result;

  const { searchFilter, sortFilter, memberFilter, getFarmersGroupData } = useFarmersGroupContext();
  const [farmersGroupMemberList, setFarmersGroupMemberList] = useState<FarmersGroup[]>(Object.values(isSuccess ? farmerGroupData : []));
  const [farmersGroupListSearch, setFarmersGroupListSearch] = useState<FarmersGroup[]>(Object.values(isSuccess ? farmerGroupData : []));
  const [farmersGroupListSort, setFarmersGroupListSort] = useState<FarmersGroup[]>(Object.values(isSuccess ? farmerGroupData : []));
  const [farmersGroupList, setFarmersGroupList] = useState<FarmersGroup[]>(Object.values(isSuccess ? farmerGroupData : []));

  useEffect(() => {
    setFarmersGroupMemberList(
      customMemberFilter.ALL === memberFilter
        ? Object.values(isSuccess && (farmerGroupData as FarmersGroup[]))
        : customMemberFilter.WITH_MEMBERS === memberFilter
        ? Object.values(isSuccess && (farmerGroupData as FarmersGroup[])).filter((list) => list.members?.length !== 0)
        : Object.values(isSuccess && (farmerGroupData as FarmersGroup[])).filter((list) => list.members?.length === 0),
    );
  }, [memberFilter, farmerGroupData, isSuccess]);

  useEffect(() => {
    setFarmersGroupListSearch(farmersGroupMemberList.filter((farmer) => searchWord(farmer.groupName, searchFilter)));
  }, [searchFilter, farmersGroupMemberList, isSuccess]);

  useEffect(() => {
    setFarmersGroupListSort(sortObj<FarmersGroup>(farmersGroupListSearch, sortFilter, "groupName"));
  }, [farmersGroupListSearch, sortFilter, isSuccess]);

  useEffect(() => {
    setFarmersGroupList(farmersGroupListSort);
  }, [farmersGroupListSort, isSuccess]);

  return (
    <>
      {farmersGroupList.length > 0 ? (
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

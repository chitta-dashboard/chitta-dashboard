import { useEffect, useState } from "react";
import { customMemberFilter, FarmersGroup, useFarmersGroupContext } from "../../../../utils/context/farmersGroup";
import { searchWord, sortObj } from "../../../../utils/constants";
import BodyWrapper from "../../../custom-tables/body";
import FarmersGroupRow from "./row";
import S from "./body.styled";

const Body = () => {
  const { farmersGroupById: listData, searchFilter, sortFilter, memberFilter } = useFarmersGroupContext();
  const [farmersGroupMemberList, setFarmersGroupMemberList] = useState(Object.values(listData));
  const [farmersGroupListSearch, setFarmersGroupListSearch] = useState(Object.values(listData));
  const [farmersGroupListSort, setFarmersGroupListSort] = useState(Object.values(listData));
  const [farmersGroupList, setFarmersGroupList] = useState(Object.values(listData));

  useEffect(() => {
    setFarmersGroupMemberList(
      customMemberFilter.ALL === memberFilter
        ? Object.values(listData)
        : customMemberFilter.WITH_MEMBERS === memberFilter
        ? Object.values(listData).filter((list) => list.members?.length !== 0)
        : Object.values(listData).filter((list) => list.members?.length === 0),
    );
  }, [memberFilter, listData]);

  useEffect(() => {
    setFarmersGroupListSearch(farmersGroupMemberList.filter((farmer) => searchWord(farmer.groupName, searchFilter)));
  }, [searchFilter, farmersGroupMemberList]);

  useEffect(() => {
    setFarmersGroupListSort(sortObj<FarmersGroup>(farmersGroupListSearch, sortFilter, "groupName"));
  }, [farmersGroupListSearch, sortFilter]);

  useEffect(() => {
    setFarmersGroupList(farmersGroupListSort);
  }, [farmersGroupListSort]);

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

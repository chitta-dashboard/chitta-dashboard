import { useState, useEffect } from "react";
import { mdDetail, useMdDetailsContext } from "../../../../utils/context/mdDetails";
import { ENDPOINTS, searchWord, sortObj } from "../../../../utils/constants";
import { useEdit, useFetch } from "../../../../utils/hooks/query";
import BodyWrapper from "../../../custom-tables/body";
import { FarmersGroup } from "../../../../utils/context/farmersGroup";
import MdDetailsRow from "./row";
import S from "./body.styled";

export interface IAddMember {
  id?: string;
  group?: string;
}

const Body = () => {
  const {
    result: { data: mdDetailsById },
    formatChangeSuccess: isSuccess,
  } = useFetch(ENDPOINTS.mdDetails);
  const {
    result: { data: farmersGroupById },
    formatChangeSuccess: isFarmerGroupSuccess,
  } = useFetch(ENDPOINTS.farmerGroup);
  const { mutate: editFarmerGroup } = useEdit(ENDPOINTS.farmerGroup);
  const { searchFilter, sortFilter } = useMdDetailsContext();
  const [mdListSearch, setMdListSearch] = useState<mdDetail[]>(isSuccess ? Object.values(mdDetailsById) : []);
  const [mdListSort, setMdListSort] = useState<mdDetail[]>(isSuccess ? Object.values(mdDetailsById) : []);
  const [mdList, setMdList] = useState<mdDetail[]>(isSuccess ? Object.values(mdDetailsById) : []);

  useEffect(() => {
    isSuccess && setMdListSearch(Object.values(mdDetailsById as mdDetail[]).filter((md) => searchWord(md.name, searchFilter)));
  }, [mdDetailsById, searchFilter, isSuccess]);

  useEffect(() => {
    isSuccess && setMdListSort(sortObj<mdDetail>(mdListSearch, sortFilter, "name"));
  }, [mdListSearch, sortFilter, isSuccess]);

  useEffect(() => {
    isSuccess && setMdList(mdListSort);
  }, [mdListSort, isSuccess]);

  const removeGroupMember = (id: string) => {
    const removeMemberIndex = Object.values(isFarmerGroupSuccess && (farmersGroupById as FarmersGroup[]))
      .map((farmersGroup) => farmersGroup.members)
      .findIndex((members) => members.includes(id));
    console.log("removeMemberIndex", removeMemberIndex);
    if (removeMemberIndex !== -1) {
      const updatedMember = Object.values(isFarmerGroupSuccess && (farmersGroupById as FarmersGroup[]))[removeMemberIndex]["members"].filter(
        (member: string) => member !== id,
      );
      console.log("updatedMember", updatedMember);
      const updatedFarmerGroup = { ...Object.values(isFarmerGroupSuccess && (farmersGroupById as FarmersGroup[]))[removeMemberIndex] };
      updatedFarmerGroup.members = updatedMember;
      console.log("updatedFarmerGroup", updatedFarmerGroup);
      editFarmerGroup({ editedData: updatedFarmerGroup });
    } else {
      console.log("no edit");
    }
  };

  const addGroupMember = (farmerData: IAddMember) => {
    console.log("farmerData", farmerData);
    const farmersGroupList = Object.values(isFarmerGroupSuccess && (farmersGroupById as FarmersGroup[]));
    const groupIndex = farmersGroupList.findIndex((list) => list.groupName === farmerData.group);
    if (groupIndex >= 0) {
      console.log("groupIndex", groupIndex);
      const newGroupMember = Object.values(isFarmerGroupSuccess && (farmersGroupById as FarmersGroup[]))[groupIndex];
      newGroupMember.members.push(farmerData.id);
      console.log("newGroupMember", newGroupMember);
      editFarmerGroup({ editedData: newGroupMember });
      // !farmersGroupList[groupIndex].members.includes(farmerData.id) && farmersGroupList[groupIndex].members.push(farmerData.id);
      // return { ...state };
      // console.log("farmersGroupList", farmersGroupList);
    }
  };

  return (
    <>
      {mdList.length > 0 ? (
        <BodyWrapper>
          {mdList.map((user) => (
            <MdDetailsRow {...{ user, removeGroupMember, addGroupMember }} key={user.id} />
          ))}
        </BodyWrapper>
      ) : (
        <S.EmptyMsg>
          <tr>
            <td>No MD Details..</td>
          </tr>
        </S.EmptyMsg>
      )}
    </>
  );
};

export default Body;

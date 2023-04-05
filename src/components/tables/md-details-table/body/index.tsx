import { useState, useEffect } from "react";
import { IMdDetails, useMdDetailsContext } from "../../../../utils/context/mdDetails";
import { ENDPOINTS, searchWord, sortObj } from "../../../../utils/constants";
import { useEdit, useFetch } from "../../../../utils/hooks/query";
import BodyWrapper from "../../../custom-tables/body";
import { FarmersGroup } from "../../../../utils/context/farmersGroup";
import MdDetailsRow from "./row";
import S from "./body.styled";

const Body = () => {
  // constants
  const {
    result: { data: mdDetailsById },
    formatChangeSuccess: isMdDetailsSuccess,
  } = useFetch(ENDPOINTS.mdDetails);

  const {
    result: { data: farmersGroupById },
    formatChangeSuccess: isFarmerGroupSuccess,
  } = useFetch(ENDPOINTS.farmerGroup);
  const { mutate: editFarmerGroup } = useEdit(ENDPOINTS.farmerGroup);
  const farmersGroupData = Object.values(isFarmerGroupSuccess && (farmersGroupById as FarmersGroup[]));

  //state values
  const { searchFilter, sortFilter, currentPage, setPageCount } = useMdDetailsContext();
  const [mdListSearch, setMdListSearch] = useState<IMdDetails[]>(isMdDetailsSuccess ? Object.values(mdDetailsById) : []);
  const [mdListSort, setMdListSort] = useState<IMdDetails[]>(isMdDetailsSuccess ? Object.values(mdDetailsById) : []);
  const [mdList, setMdList] = useState<IMdDetails[]>(isMdDetailsSuccess ? Object.values(mdDetailsById) : []);

  //functions
  const removeGroupMember = (id: string, group: string) => {
    let removeMemberIndex = -1;
    const isCountUpdate = farmersGroupData.find((list, index) => {
      if (list?.members.includes(id)) {
        removeMemberIndex = index;
      }
      if (list.groupName === group && list?.members.includes(id)) {
        return list;
      }
    });
    if (!isCountUpdate) {
      const updatedMember = farmersGroupData[removeMemberIndex]?.members.filter((member: string) => member !== id);
      const updatedFarmerGroup = { ...farmersGroupData[removeMemberIndex] };
      updatedFarmerGroup.members = updatedMember;
      updatedFarmerGroup.members &&
        editFarmerGroup({
          editedData: updatedFarmerGroup,
          successCb: (data) => {
            setTimeout(() => addGroupMember(id, group, Object.values(data)), 0);
          },
        });
      !updatedFarmerGroup.members && addGroupMember(id, group, farmersGroupData);
    }
  };

  const addGroupMember = (id: string, group: string, data: FarmersGroup[]) => {
    const groupIndex = data.findIndex((list) => list.groupName === group);
    const newGroupMember = JSON.parse(JSON.stringify(data[groupIndex]));
    newGroupMember.members.push(id);
    newGroupMember.members &&
      editFarmerGroup({
        editedData: newGroupMember,
      });
  };

  useEffect(() => {
    let result = isMdDetailsSuccess && Object.values(mdDetailsById as IMdDetails[]).filter((md) => searchWord(md.name, searchFilter));
    let updatedData = isMdDetailsSuccess && result && [...result];
    isMdDetailsSuccess && result && setMdListSearch(result.splice((currentPage - 1) * 6, 6));
    result && updatedData && setPageCount({ pageCount: Math.ceil(result.length / 6) + 1, totalPageCount: updatedData.length });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdDetailsById, searchFilter, isMdDetailsSuccess, currentPage]);

  useEffect(() => {
    isMdDetailsSuccess && setMdListSort(sortObj<IMdDetails>(mdListSearch, sortFilter, "name"));
  }, [mdListSearch, sortFilter, isMdDetailsSuccess]);

  useEffect(() => {
    isMdDetailsSuccess && setMdList(mdListSort);
  }, [mdListSort, isMdDetailsSuccess]);

  return (
    <>
      {mdList.length > 0 ? (
        <BodyWrapper>
          {mdList.map((user) => (
            <MdDetailsRow {...{ user, removeGroupMember }} key={user.id} />
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

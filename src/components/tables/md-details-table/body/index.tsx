import { useEffect } from "react";
import S from "./body.styled";
import { ENDPOINTS } from "../../../../utils/constants";
import { FarmersGroup } from "../../../../utils/context/farmersGroup";
import { IMdDetails, useMdDetailsContext } from "../../../../utils/context/mdDetails";
import { useSearchQuery, useSortQuery } from "../../../../utils/helpers";
import { useEdit, useFetch, useFetchByPage } from "../../../../utils/hooks/query";
import BodyWrapper from "../../../custom-tables/body";
import MdDetailsRow from "./row";

const Body = () => {
  // state values
  const { searchFilter, sortFilter, currentPage, setPageCount, setMdQuery } = useMdDetailsContext();
  const searchQuery = useSearchQuery(searchFilter, "name");
  const sortQuery = useSortQuery(sortFilter, "name");
  // constants
  const groupQuery = "";
  const dataLimit = 7;
  // Queries
  const {
    result: { data: mdDetailsById, refetch: mdDetailRefetch, isFetched: isMdDetailsSuccess },
    dataCount: totalDataCount,
  } = useFetchByPage(ENDPOINTS.mdDetails, currentPage, `${searchQuery}${groupQuery}${sortQuery}`, dataLimit);

  const {
    result: { data: farmersGroupById },
    formatChangeSuccess: isFarmerGroupSuccess,
  } = useFetch(ENDPOINTS.farmerGroup);
  const { mutate: editFarmerGroup } = useEdit(ENDPOINTS.farmerGroup);

  const farmersGroupData = Object.values(isFarmerGroupSuccess && (farmersGroupById as FarmersGroup[]));
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
    setPageCount({ pageCount: Math.ceil(totalDataCount / dataLimit), totalPageCount: totalDataCount });
  }, [totalDataCount, mdDetailsById]);

  useEffect(() => {
    mdDetailRefetch();
    setMdQuery(`${searchQuery}${groupQuery}${sortQuery}`);
  }, [searchFilter, sortFilter, currentPage]);

  return (
    <>
      {isMdDetailsSuccess && mdDetailsById.length > 0 ? (
        <BodyWrapper>
          {isMdDetailsSuccess &&
            mdDetailsById.map((user: IMdDetails) => (
              <MdDetailsRow {...{ user, removeGroupMember }} key={user.id} params={`${searchQuery}${groupQuery}${sortQuery}`} />
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

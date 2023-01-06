import { useEffect } from "react";
import S from "./body.styled";
import { ENDPOINTS } from "../../../../utils/constants";
import { farmerDetail, useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import { FarmersGroup } from "../../../../utils/context/farmersGroup";
import { useSearchQuery, useSortQuery } from "../../../../utils/helpers";
import { useEdit, useFetch, useFetchByPage, useGetFarmersId } from "../../../../utils/hooks/query";
import Loader from "../../../../utils/loaders/tree-loader";
import BodyWrapper from "../../../custom-tables/body";
import FarmersDetailsRow from "./row";

const Body = () => {
  // state values
  const { searchFilter, sortFilter, groupFilter, currentPage, setPageCount, setFarmersIdToExport, setFarmerQuery } = useFarmerDetailsContext();
  const searchQuery = useSearchQuery(searchFilter, "name");
  const sortQuery = useSortQuery(sortFilter, "name");
  const groupQuery = groupFilter === "all" ? "" : `&group_like=${groupFilter.split(" ").join("%20")}`;
  const dataLimit = 25;
  // Queries
  const {
    result: { data: farmersDetailsByPage, refetch: farmerPageRefetch, isFetched: isFarmerByPageSuccess },
    dataCount: totalDataCount,
  } = useFetchByPage(ENDPOINTS.farmerDetails, currentPage, `${searchQuery}${groupQuery}${sortQuery}`, dataLimit);

  const { farmerId, farmerIdRefetch } = useGetFarmersId(ENDPOINTS.farmerDetails, `${searchQuery}${groupQuery}${sortQuery}`);
  const {
    result: { data: farmersGroupById },
    formatChangeSuccess: isFarmerGroupSuccess,
  } = useFetch(ENDPOINTS.farmerGroup);
  const { mutate: editFarmerGroup } = useEdit(ENDPOINTS.farmerGroup);

  useEffect(() => {
    farmerPageRefetch();
    farmerIdRefetch();
    setFarmerQuery(`${searchQuery}${groupQuery}${sortQuery}`);
  }, [searchQuery, sortQuery, groupQuery, currentPage, isFarmerByPageSuccess]);

  useEffect(() => {
    setFarmersIdToExport(farmerId);
  }, [farmerId]);

  useEffect(() => {
    setPageCount({ pageCount: Math.ceil(totalDataCount / dataLimit), totalPageCount: totalDataCount });
  }, [totalDataCount, isFarmerByPageSuccess]);

  const farmersGroupData = Object.values(isFarmerGroupSuccess && (farmersGroupById as FarmersGroup[]));
  const removeGroupMember = (id: string, group: string, toAdd: boolean) => {
    let removeMemberIndex = -1;
    const isCountUpdate = farmersGroupData.find((list, index) => {
      if (list?.members.includes(id)) {
        removeMemberIndex = index;
      }
      if (list.groupName === group && list?.members.includes(id)) {
        return list;
      }
    });
    const onlyRemove = !toAdd ? !toAdd : !isCountUpdate;
    if (onlyRemove) {
      const updatedMember = farmersGroupData[removeMemberIndex]?.members.filter((member: string) => member !== id);
      const updatedFarmerGroup = { ...farmersGroupData[removeMemberIndex] };
      updatedFarmerGroup.members = updatedMember;
      updatedFarmerGroup.members &&
        editFarmerGroup({
          editedData: updatedFarmerGroup,
          successCb: (data) => {
            setTimeout(() => toAdd && addGroupMember(id, group, Object.values(data)), 0);
          },
        });
      !updatedFarmerGroup.members && toAdd && addGroupMember(id, group, farmersGroupData);
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

  return (
    <>
      {!isFarmerByPageSuccess ? (
        <S.LoaderContainer>
          <S.Customtr>
            <td>
              <Loader />
            </td>
          </S.Customtr>
        </S.LoaderContainer>
      ) : isFarmerByPageSuccess && farmersDetailsByPage.length > 0 ? (
        <BodyWrapper>
          {farmersDetailsByPage &&
            farmersDetailsByPage.map((user: farmerDetail) => (
              <FarmersDetailsRow {...{ user, removeGroupMember }} key={user.id} params={`${searchQuery}${groupQuery}${sortQuery}`} />
            ))}
        </BodyWrapper>
      ) : (
        <S.EmptyMsg>
          <tr>
            <td>No Farmer Details.</td>
          </tr>
        </S.EmptyMsg>
      )}
    </>
  );
};

export default Body;

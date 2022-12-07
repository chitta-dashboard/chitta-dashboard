import { useState, useEffect } from "react";
import { farmerDetail, useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import { ENDPOINTS, searchWord, sortObj } from "../../../../utils/constants";
import { FarmersGroup } from "../../../../utils/context/farmersGroup";
import { useEdit, useFetch } from "../../../../utils/hooks/query";
import Loader from "../../../../utils/loaders/tree-loader";
import BodyWrapper from "../../../custom-tables/body";
import FarmersDetailsRow from "./row";
import S from "./body.styled";

const Body = () => {
  const {
    addFarmerId,
    searchFilter,
    sortFilter,
    groupFilter,
    currentPage,
    setPageCount,
    setFarmersIdToExport,
  } = useFarmerDetailsContext();

  const {
    formatChangeSuccess: isSuccess,
    result: { data: farmersDetailsById },
  }: any = useFetch(ENDPOINTS.farmerDetails);

  const {
    result: { data: farmersGroupById },
    formatChangeSuccess: isFarmerGroupSuccess,
  } = useFetch(ENDPOINTS.farmerGroup);
  const { mutate: editFarmerGroup } = useEdit(ENDPOINTS.farmerGroup);
  const [farmersListGroup, setFarmersListGroup] = useState<farmerDetail[]>([]);
  const [farmersListSearch, setFarmersListSearch] = useState<farmerDetail[]>([]);
  const [farmersListSort, setFarmersListSort] = useState<farmerDetail[]>([]);
  const [farmersList, setFarmersList] = useState<farmerDetail[]>([]);
  const [exportFarmerId, setExportFarmerID] = useState<farmerDetail[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    setLoader(false);

    setTimeout(() => {
      setLoader(true);
    }, 300);
  }, []);

  // farmer group filter for farmer detail table
  useEffect(() => {
    if (isSuccess) {
      setFarmersListGroup(
        groupFilter === "all"
          ? Object.values(farmersDetailsById as farmerDetail[])
          : Object.values(farmersDetailsById as farmerDetail[]).filter((list) => list.group === groupFilter),
      );
    }
  }, [groupFilter, isSuccess, currentPage, farmersDetailsById]);

  useEffect(() => {
    let result = isSuccess && Object.values(farmersListGroup as farmerDetail[]).filter((farmer) => searchWord(farmer.name, searchFilter));
    setExportFarmerID(sortObj<farmerDetail>(Object.values(result), sortFilter, "name"));
    let updatedData = isSuccess && [...result];
    isSuccess && setFarmersListSearch(result.splice((currentPage - 1) * 25, 25));
    setPageCount({ pageCount: Math.ceil(result.length / 25) + 1, totalPageCount: updatedData.length });
  }, [searchFilter, farmersListGroup, isSuccess, sortFilter]);

  useEffect(() => {
    isSuccess && setFarmersListSort(sortObj<farmerDetail>(farmersListSearch, sortFilter, "name"));
  }, [farmersListSearch, sortFilter, isSuccess]);

  //farmer id to export farmers
  useEffect(() => {
    isSuccess && setFarmersList(farmersListSort);
    //console.log("Export Data : ",exportFarmerId)
    let farmersId = exportFarmerId && exportFarmerId.map((item) => item.id);
    //console.log("Farmer Id : ",farmerId)
    setFarmersIdToExport(farmersId);
  }, [farmersListSort, isSuccess, exportFarmerId]);

  //For tamil share holder certificate
  useEffect(() => {
    if (isSuccess) {
      const farmerId = exportFarmerId && exportFarmerId.map((item: any) => item.id);
      isSuccess && addFarmerId(farmerId);
    }
  }, [isSuccess, farmersList, exportFarmerId]);

  const farmersGroupData = Object.values(isFarmerGroupSuccess && (farmersGroupById as FarmersGroup[]));
  const removeGroupMember = async (id: string, group: string, isAdd: boolean) => {
    const noCountUpdate = farmersGroupData.findIndex((list) => list.groupName === group);
    const farmerDelete = isAdd ? (!farmersGroupData[noCountUpdate].members.includes(id) as boolean) : true;
    if (farmerDelete) {
      const removeMemberIndex = farmersGroupData.map((farmersGroup) => farmersGroup.members).findIndex((members) => members.includes(id));
      const updatedMember = farmersGroupData[removeMemberIndex]?.members.filter((member: string) => member !== id);
      const updatedFarmerGroup = { ...farmersGroupData[removeMemberIndex] };
      updatedFarmerGroup.members = updatedMember;
      isAdd && (await addGroupMember(id, group));
      updatedFarmerGroup.members && (await editFarmerGroup({ editedData: updatedFarmerGroup }));
    }
  };

  const addGroupMember = async (id: string, group: string) => {
    const groupIndex = farmersGroupData.findIndex((list) => list.groupName === group);
    const newGroupMember = farmersGroupData[groupIndex];
    newGroupMember.members.push(id);
    await editFarmerGroup({ editedData: newGroupMember });
  };

  return (
    <>
      {!loader ? (
        <S.LoaderContainer>
          <S.Customtr>
            <td>
              <Loader />
            </td>
          </S.Customtr>
        </S.LoaderContainer>
      ) : farmersList.length > 0 ? (
        <BodyWrapper>
          {farmersList.map((user: farmerDetail) => (
            <FarmersDetailsRow {...{ user, removeGroupMember }} key={user.id} />
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

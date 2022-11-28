import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ENDPOINTS, searchWord, sortObj } from "../../../../utils/constants";
import { farmerDetail, addFarmerId, setPageCount,setCurrentPage,setFarmersIdToExport } from "../../../../utils/store/slice/farmerDetails";
import { FarmersGroup } from "../../../../utils/context/farmersGroup";
import { useEdit, useFetch, useFetchByPage, useGetFarmersId } from "../../../../utils/hooks/query";
import Loader from "../../../../utils/loaders/tree-loader";
import BodyWrapper from "../../../custom-tables/body";
import FarmersDetailsRow from "./row";
import S from "./body.styled";

const Body = () => {
  const { searchFilter, sortFilter, groupFilter, currentPage, selectedFarmers } = useSelector((state: any) => state.farmerDetails);
  const dispatch = useDispatch();
  const {
    formatChangeSuccess: isSuccess,
    result: { data: farmersDetailsById },
  }: any = useFetch(ENDPOINTS.farmerDetails);
  
  const searchQuery = searchFilter === "" ? `?q=` : `?name_like=${searchFilter}`
  const sortQuery = sortFilter === "normal" ? "" : `&_sort=name&_order=${sortFilter === "descending" ? "desc" : sortFilter === "ascending" ? "asc" : ""}`;
  const groupQuery = groupFilter === "all" ? "" : `&group_like=${groupFilter.split(" ").join("%20")}`;
  const {
    formatChangeSuccess: isFarmerByPageSuccess,
    result: { data: farmersDetailsByPage,refetch: farmerPageRefetch },
    dataCount : totalDataCount
  } = useFetchByPage(ENDPOINTS.farmerDetails, currentPage, `${searchQuery}${groupQuery}${sortQuery}`);

  const { farmerId,farmerIdRefetch } = useGetFarmersId(ENDPOINTS.farmerDetails, `${searchQuery}${groupQuery}${sortQuery}`);
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

  useEffect(() => {
    farmerPageRefetch();
    farmerIdRefetch()
  }, [searchFilter, sortFilter, groupFilter]);

  useEffect(()=>{
    dispatch(addFarmerId(farmerId));
    dispatch(setFarmersIdToExport(farmerId));
  },[farmerId])
  

  useEffect(() => {
    dispatch(setPageCount({ pageCount: Math.ceil(totalDataCount / 25), totalPageCount: totalDataCount }));
    totalDataCount <= 25 && currentPage !== 1 && dispatch(setCurrentPage(1));
  }, [totalDataCount]);

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
    isFarmerByPageSuccess && setFarmersListSearch(Object.values(farmersDetailsByPage));
  }, [searchFilter, farmersListGroup, isSuccess, isFarmerByPageSuccess, sortFilter]);

  useEffect(() => {
    isSuccess && setFarmersListSort(sortObj<farmerDetail>(farmersListSearch, sortFilter, "name"));
  }, [farmersListSearch, sortFilter, isSuccess]);

  //farmer id to export farmers
  useEffect(() => {
    isSuccess && setFarmersList(farmersListSort);
    //console.log("Export Data : ",exportFarmerId)
    let farmersId = exportFarmerId && exportFarmerId.map((item) => item.id);
    //console.log("Farmer Id : ",farmerId)
    //dispatch(setFarmersIdToExport(farmersId));
  }, [farmersListSort, isSuccess, exportFarmerId]);

  // For tamil share holder certificate
  useEffect(() => {
    if (isSuccess) {
      const farmerId = exportFarmerId && exportFarmerId.map((item: any) => item.id);
      //isSuccess && dispatch(addFarmerId(farmerId));
    }
  }, [isSuccess, farmersList, exportFarmerId]);

  const farmersGroupData = Object.values(isFarmerGroupSuccess && (farmersGroupById as FarmersGroup[]));
  const removeGroupMember = async (id: string, group: string, isAdd: boolean) => {
    const noCountUpdate = farmersGroupData.findIndex((list) => list.groupName === group);
    const farmerDelete = isAdd ? !farmersGroupData[noCountUpdate].members.includes(id) : true;
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
      {!isFarmerByPageSuccess ? (
        <S.LoaderContainer>
          <S.Customtr>
            <td>
              <Loader />
            </td>
          </S.Customtr>
        </S.LoaderContainer>
      ) : isFarmerByPageSuccess ? (
        <BodyWrapper>
          {farmersDetailsByPage &&
            Object.values(farmersDetailsByPage as farmerDetail[]).map((user: farmerDetail) => (
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

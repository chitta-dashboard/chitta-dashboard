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
  //state values
  const [farmersListGroup, setFarmersListGroup] = useState<farmerDetail[]>([]);
  const [farmersListSearch, setFarmersListSearch] = useState<farmerDetail[]>([]);
  const [farmersListSort, setFarmersListSort] = useState<farmerDetail[]>([]);
  const [farmersList, setFarmersList] = useState<farmerDetail[]>([]);
  const [exportFarmerId, setExportFarmerID] = useState<farmerDetail[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const { addFarmerId, searchFilter, sortFilter, groupFilter, currentPage, setPageCount, setFarmersIdToExport } = useFarmerDetailsContext();

  //constants
  const {
    formatChangeSuccess: isFarmerDetailsSuccess,
    result: { data: farmersDetailsById },
  } = useFetch(ENDPOINTS.farmerDetails);
  const {
    result: { data: farmersGroupById },
    formatChangeSuccess: isFarmerGroupSuccess,
  } = useFetch(ENDPOINTS.farmerGroup);
  const { mutate: editFarmerGroup } = useEdit(ENDPOINTS.farmerGroup);
  const farmersGroupData = Object.values(isFarmerGroupSuccess && (farmersGroupById as FarmersGroup[]));

  //functions
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

  useEffect(() => {
    setLoader(false);

    setTimeout(() => {
      setLoader(true);
    }, 300);
  }, []);

  // farmer group filter for farmer detail table
  useEffect(() => {
    if (isFarmerDetailsSuccess) {
      setFarmersListGroup(
        groupFilter === "all"
          ? Object.values(farmersDetailsById as farmerDetail[])
          : Object.values(farmersDetailsById as farmerDetail[]).filter((list) => list.group === groupFilter),
      );
    }
  }, [groupFilter, isFarmerDetailsSuccess, currentPage, farmersDetailsById]);

  useEffect(() => {
    let result = isFarmerDetailsSuccess ? Object.values(farmersListGroup).filter((farmer) => searchWord(farmer.name, searchFilter)) : [];
    setExportFarmerID(sortObj<farmerDetail>(Object.values(result), sortFilter, "name"));
    let updatedData = isFarmerDetailsSuccess ? [...result] : [];
    isFarmerDetailsSuccess && setFarmersListSearch(result.splice((currentPage - 1) * 25, 25));
    setPageCount({ pageCount: Math.ceil(result.length / 25) + 1, totalPageCount: updatedData.length });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilter, farmersListGroup, isFarmerDetailsSuccess, sortFilter]);

  useEffect(() => {
    isFarmerDetailsSuccess && setFarmersListSort(sortObj<farmerDetail>(farmersListSearch, sortFilter, "name"));
  }, [farmersListSearch, sortFilter, isFarmerDetailsSuccess]);

  //farmer id to export farmers
  useEffect(() => {
    isFarmerDetailsSuccess && setFarmersList(farmersListSort);
    let farmersId = exportFarmerId && exportFarmerId.map((item) => item.id);
    setFarmersIdToExport(farmersId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [farmersListSort, isFarmerDetailsSuccess, exportFarmerId]);

  //For tamil share holder certificate
  useEffect(() => {
    if (isFarmerDetailsSuccess) {
      const farmerId = exportFarmerId && exportFarmerId.map((item: any) => item.id);
      isFarmerDetailsSuccess && addFarmerId(farmerId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFarmerDetailsSuccess, farmersList, exportFarmerId]);

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
        <S.NoFarmerContainer>
          <tr>
            <td>No Farmer Details.</td>
          </tr>
        </S.NoFarmerContainer>
      )}
    </>
  );
};

export default Body;

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import S from "./farmersDetails.styled";
import AddFarmersDetailsModal from "../../components/modals/farmers-details-modal";
import FarmersDetailsTablePageHeader from "../../components/table-page-header/farmers-details-table-page-header";
import FarmersDetailsTable from "../../components/tables/farmers-details-table";
import { ENDPOINTS, Message } from "../../utils/constants";
import { useAuthContext } from "../../utils/context/auth";
import { useFarmerDetailsContext } from "../../utils/context/farmersDetails";
import { FarmersGroup } from "../../utils/context/farmersGroup";
import { IMdDetails } from "../../utils/context/mdDetails";
import { useAdd, useEdit, useFetch } from "../../utils/hooks/query";
import { CircularStatic } from "../../utils/loaders/circular-progress-loader/index";
import Loader from "../../utils/loaders/tree-loader";
import Toast from "../../utils/toast";

const FarmersDetails = () => {
  // constants
  const toastId = "toastId";
  // state values
  const { currentPage, isCircleLoading, setFarmerBankDetail, setSearchFilter } = useFarmerDetailsContext();
  // Queries
  const {
    result: { data: farmersGroupById },
    formatChangeSuccess: isFarmerGroupSuccess,
  } = useFetch(ENDPOINTS.farmerGroup);

  const queryClient = useQueryClient();
  const { mutate: editFarmerGroup } = useEdit(ENDPOINTS.farmerGroup);
  const { result } = useFetch(ENDPOINTS.farmerDetails);
  const { mutate } = useAdd(ENDPOINTS.farmerDetails);
  // state values
  const { addNotification } = useAuthContext();
  const [addModal, setAddModal] = useState(false);

  //Add Modal Handler
  const addModalHandler = () => {
    setAddModal(!addModal);
    setFarmerBankDetail(true);
  };

  const farmersGroupData = Object.values(isFarmerGroupSuccess && (farmersGroupById as FarmersGroup[]));
  const addGroupMember = async (id: string, group: string) => {
    const groupIndex = farmersGroupData.findIndex((list) => list.groupName === group);
    const newGroupMember = farmersGroupData[groupIndex];
    newGroupMember.members.push(id);
    editFarmerGroup({ editedData: newGroupMember });
  };

  // Add Farmerdetail Handler
  const addDataHandler = async (data: IMdDetails) => {
    setFarmerBankDetail(false);
    const newFarmer = { ...data };
    data && delete newFarmer.farmerId;
    newFarmer &&
      mutate({
        data: newFarmer,
        successCb: () => {
          setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: [`${ENDPOINTS.farmerDetails}-fetch-${currentPage}`] });
          }, 0);
          addNotification({ id: `add_${newFarmer.id}`, image: newFarmer.profile, message: Message(newFarmer.name).addFarmDetail });
          Toast({ message: "Farmer Added Successfully", type: "success", customId: `${toastId}-farmerAddSuccess` });
        },
        errorCb: () => {
          Toast({ message: "Request failed! Please try again", type: "error", customId: `${toastId}-farmerAddFail` });
        },
      });
    await addGroupMember(data.id, data.group);
  };

  const handleSearchInput = (searchText: string) => {
    setSearchFilter(searchText);
  };

  return (
    <>
      {result.isFetching ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <S.FarmersDetailsContainer>
            <FarmersDetailsTablePageHeader addModalHandler={addModalHandler} searchHandler={handleSearchInput} />
            <FarmersDetailsTable />
          </S.FarmersDetailsContainer>
          <AddFarmersDetailsModal
            openModal={addModal}
            handleClose={() => {
              addModalHandler();
              setFarmerBankDetail(false);
            }}
            cb={addDataHandler}
          />
          <S.CircularLoaderContainer open={isCircleLoading} onClose={() => {}}>
            <CircularStatic timerDelay={0} />
          </S.CircularLoaderContainer>
        </>
      )}
    </>
  );
};

export default FarmersDetails;

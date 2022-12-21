import { useState } from "react";
import { FarmersGroup } from "../../utils/context/farmersGroup";
import { IMdDetails } from "../../utils/context/mdDetails";
import { useAuthContext } from "../../utils/context/auth";
import { useFarmerDetailsContext } from "../../utils/context/farmersDetails";
import { ENDPOINTS, Message } from "../../utils/constants";
import { useAdd, useEdit, useFetch } from "../../utils/hooks/query";
import Toast from "../../utils/toast";
import FarmersDetailsTablePageHeader from "../../components/table-page-header/farmers-details-table-page-header";
import FarmersDetailsTable from "../../components/tables/farmers-details-table";
import AddFarmersDetailsModal from "../../components/modals/farmers-details-modal";
import Loader from "../../utils/loaders/tree-loader";
import S from "./farmersDetails.styled";

const FarmersDetails = () => {
  const { setSearchFilter, setFarmerBankDetail } = useFarmerDetailsContext();

  const {
    result: { data: farmersGroupById },
    formatChangeSuccess: isFarmerGroupSuccess,
  } = useFetch(ENDPOINTS.farmerGroup);

  const { mutate: editFarmerGroup } = useEdit(ENDPOINTS.farmerGroup);
  const { result } = useFetch(ENDPOINTS.farmerDetails);
  const { mutate } = useAdd(ENDPOINTS.farmerDetails);

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
    await editFarmerGroup({ editedData: newGroupMember });
  };

  // Add Farmerdetail Handler
  const addDataHandler = async (data: IMdDetails) => {
    setFarmerBankDetail(false);
    const newFarmer = { ...data };
    data && delete newFarmer.farmerId;
    newFarmer &&
      (await mutate({
        data: newFarmer,
        successCb: () => {
          addNotification({ id: `add_${newFarmer.id}`, image: newFarmer.profile, message: Message(newFarmer.name).addFarmDetail });
          Toast({ message: "Farmer Added Successfully", type: "success" });
        },
        errorCb: () => {
          Toast({ message: "Request failed! Please try again", type: "error" });
        },
      }));
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
            <FarmersDetailsTablePageHeader
              addModalHandler={addModalHandler}
              searchHandler={handleSearchInput}
              // sortFilter={sortFilter}
              // sortHandler={(sortValue) => setSortFilter(sortValue)}
            />
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
        </>
      )}
    </>
  );
};

export default FarmersDetails;

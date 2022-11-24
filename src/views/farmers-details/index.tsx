import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FarmersGroup } from "../../utils/context/farmersGroup";
import { mdDetail } from "../../utils/context/mdDetails";
import { useAuthContext } from "../../utils/context/auth";
import { ENDPOINTS, Message } from "../../utils/constants";
import { useAdd, useEdit, useFetch } from "../../utils/hooks/query";
import Toast from "../../utils/toast";
import { setSearchFilter, setSortFilter, setCurrentPage } from "../../utils/store/slice/farmerDetails";
import { RootState } from "../../utils/store";
import FarmersDetailsTablePageHeader from "../../components/table-page-header/farmers-details-table-page-header";
import FarmersDetailsTable from "../../components/tables/farmers-details-table";
import AddFarmersDetailsModal from "../../components/modals/farmers-details-modal";
import ShareAmountModal from "../../components/modals/share-amount-modal";
import Loader from "../../utils/loaders/tree-loader";
import S from "./farmersDetails.styled";

const FarmersDetails = () => {
  const {
    result: { data: farmersGroupById },
    formatChangeSuccess: isFarmerGroupSuccess,
  } = useFetch(ENDPOINTS.farmerGroup);
  const { mutate: editFarmerGroup } = useEdit(ENDPOINTS.farmerGroup);
  const { result } = useFetch(ENDPOINTS.farmerDetails);
  const { mutate } = useAdd(ENDPOINTS.farmerDetails);
  const { sortFilter } = useSelector((state: RootState) => state.farmerDetails);
  const dispatch = useDispatch();
  const { addNotification } = useAuthContext();
  const [addModal, setAddModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  //Add Modal Handler
  const addModalHandler = () => {
    setAddModal(!addModal);
  };

  //Share Amount Modal Handler
  const shareAmountModalHandler = () => {
    setShareModal(!shareModal);
  };

  const farmersGroupData = Object.values(isFarmerGroupSuccess && (farmersGroupById as FarmersGroup[]));
  const addGroupMember = async (id: string, group: string) => {
    const groupIndex = farmersGroupData.findIndex((list) => list.groupName === group);
    const newGroupMember = farmersGroupData[groupIndex];
    newGroupMember.members.push(id);
    await editFarmerGroup({ editedData: newGroupMember });
  };

  // Add Farmerdetail Handler
  const addDataHandler = async (data: mdDetail) => {
    const newFarmer = { ...data };
    data && delete newFarmer.farmerId;
    newFarmer &&
      (await mutate({
        data: newFarmer,
        successCb: () => {
          addNotification({ id: newFarmer.id, image: newFarmer.profile, message: Message(newFarmer.name).addFarmDetail });
          Toast({ message: "Farmer Added Successfully", type: "success" });
        },
        errorCb: () => {
          Toast({ message: "Request failed! Please try again", type: "error" });
        },
      }));
    await addGroupMember(data.id, data.group);
  };

  const handleSearchInput = (searchText: string) => {
    dispatch(setCurrentPage(1));
    dispatch(setSearchFilter(searchText));
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
              sortFilter={sortFilter}
              sortHandler={(sortValue) => dispatch(setSortFilter(sortValue))}
              shareAmountModalHandler={shareAmountModalHandler}
            />
            <FarmersDetailsTable />
          </S.FarmersDetailsContainer>
          <ShareAmountModal openModal={shareModal} handleClose={shareAmountModalHandler} />
          <AddFarmersDetailsModal openModal={addModal} handleClose={addModalHandler} cb={addDataHandler} />
        </>
      )}
    </>
  );
};

export default FarmersDetails;

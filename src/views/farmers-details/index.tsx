import { useState } from "react";
// import { farmerDetail, useFarmerDetailsContext } from "../../utils/context/farmersDetails";
import { useDispatch, useSelector } from "react-redux";
import { useFarmersGroupContext } from "../../utils/context/farmersGroup";
import { useAuthContext } from "../../utils/context/auth";
import { ENDPOINTS, Message } from "../../utils/constants";
import { addFarmerDetails, setSearchFilter, setSortFilter, farmerDetail, setCurrentPage } from "../../utils/store/slice/farmerDetails";
import { RootState } from "../../utils/store";
import FarmersDetailsTablePageHeader from "../../components/table-page-header/farmers-details-table-page-header";
import FarmersDetailsTable from "../../components/tables/farmers-details-table";
import AddFarmersDetailsModal from "../../components/modals/farmers-details-modal";
import ShareAmountModal from "../../components/modals/share-amount-modal";
import Loader from "../../components/loader";
import { useAdd, useFetch } from "../../utils/hooks/query";
import S from "./farmersDetails.styled";

const FarmersDetails = () => {
  // const { addFarmerDetail, setSearchFilter, sortFilter, setSortFilter } = useFarmerDetailsContext();
  const { sortFilter } = useSelector((state: RootState) => state.farmerDetails);
  const { result } = useFetch(ENDPOINTS.farmerDetails);
  const { mutate } = useAdd(ENDPOINTS.farmerDetails);
  const { addGroupMember } = useFarmersGroupContext();
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

  // Add Farmerdetail Handler
  const addDataHandler = (data: farmerDetail) => {
    const AddNewMember = { id: data.id, group: data.group };
    addGroupMember(AddNewMember);
    dispatch(addFarmerDetails(data));
    addNotification({ id: data.id, image: data.profile, message: Message(data.name).addFarmDetail });
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
          <AddFarmersDetailsModal openModal={addModal} handleClose={addModalHandler} cb={(data) => mutate({ data: data })} />
        </>
      )}
    </>
  );
};

export default FarmersDetails;

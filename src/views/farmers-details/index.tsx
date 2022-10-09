import { useState } from "react";
import FarmersDetailsTablePageHeader from "../../components/table-page-header/farmers-details-table-page-header";
import FarmersDetailsTable from "../../components/tables/farmers-details-table";
import AddFarmersDetailsModal from "../../components/modals/farmers-details-modal";
import { useFarmerDetailsContext } from "../../utils/context/farmersDetails";
import { IAddFarmersDetailsFormInput } from "../../components/modals/type/formInputs";
import ShareAmountModal from "../../components/modals/share-amount-modal";
import S from "./farmersDetails.styled";

const FarmersDetails = () => {
  const [addModal, setAddModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const { addFarmerDetail, setSearchFilter, sortFilter, setSortFilter } = useFarmerDetailsContext();

  //Add Modal Handler
  const addModalHandler = () => {
    setAddModal(!addModal);
  };

  //Share Amount Modal Handler
  const shareAmountModalHandler = () => {
    setShareModal(!shareModal);
  };

  // Add Farmerdetail Handler
  const addDataHandler = (data: IAddFarmersDetailsFormInput & { id: string; membershipId: string }) => {
    addFarmerDetail(data);
  };

  return (
    <>
      <S.FarmersDetailsContainer>
        <FarmersDetailsTablePageHeader
          addModalHandler={addModalHandler}
          searchHandler={setSearchFilter}
          sortFilter={sortFilter}
          sortHandler={setSortFilter}
          shareAmountModalHandler={shareAmountModalHandler}
        />
        <FarmersDetailsTable />
      </S.FarmersDetailsContainer>
      <ShareAmountModal openModal={shareModal} handleClose={shareAmountModalHandler} />
      <AddFarmersDetailsModal openModal={addModal} handleClose={addModalHandler} cb={addDataHandler} />
    </>
  );
};

export default FarmersDetails;

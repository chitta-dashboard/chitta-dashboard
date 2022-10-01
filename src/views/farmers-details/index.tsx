import { useState } from "react";

import FarmersDetailsTablePageHeader from "../../components/table-page-header/farmers-details-table-page-header";
import FarmersDetailsTable from "../../components/tables/farmers-details-table";
import AddFarmersDetailsModal from "../../components/modals/farmers-details-modal";
import { FarmerDetailsContextProvider, useFarmerDetailsContext } from "../../utils/context/farmersDetails";
import { IAddFarmersDetailsFormInput } from "../../components/modals/type/formInputs";

import S from "./farmersDetails.styled";

const FarmersDetails = () => {
  const [addModal, setAddModal] = useState(false);
  const { addFarmerDetail } = useFarmerDetailsContext();

  //Add Modal Handler
  const addModalHandler = () => {
    setAddModal(!addModal);
  };
  // Add Farmerdetail Handler
  const addDataHandler = (data: IAddFarmersDetailsFormInput & { id: string; membershipId: string }) => {
    addFarmerDetail(data);
  };

  return (
    <FarmerDetailsContextProvider>
      <S.FarmersDetailsContainer>
        <FarmersDetailsTablePageHeader addModalHandler={addModalHandler} />
        <FarmersDetailsTable />
      </S.FarmersDetailsContainer>
      <AddFarmersDetailsModal openModal={addModal} handleClose={addModalHandler} cb={addDataHandler} />
    </FarmerDetailsContextProvider>
  );
};

export default FarmersDetails;

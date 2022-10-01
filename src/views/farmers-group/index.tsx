import { useState } from "react";

import TablePageHeader from "../../components/common-table-page-header";
import AddFarmersGroupModal from "../../components/modals/farmers-group-modal";
import { IAddFarmersGroupFormInput } from "../../components/modals/type/formInputs";
import FarmersGroupTable from "../../components/tables/farmers-group-table";
import { FarmerGroupDetailsContextProvider, useFarmerGroupDetailsContext } from "../../utils/context/farmersGroup";

import S from "./farmersGroup.styled";

const FarmersGroup = () => {
  const [addModal, setAddModal] = useState(false);
  const { addFarmerGroupDetail } = useFarmerGroupDetailsContext();

  //Add Modal Handler
  const addModalHandler = () => {
    setAddModal(!addModal);
  };

  // Add Farmergroup Handler
  const addDataHandler = (data: IAddFarmersGroupFormInput & { id: string }) => {
    addFarmerGroupDetail(data);
  };

  return (
    <FarmerGroupDetailsContextProvider>
      <S.FarmersGroupContainer>
        <TablePageHeader addModalHandler={addModalHandler} />
        <FarmersGroupTable />
      </S.FarmersGroupContainer>
      <AddFarmersGroupModal openModal={addModal} handleClose={addModalHandler} cb={addDataHandler} />
    </FarmerGroupDetailsContextProvider>
  );
};

export default FarmersGroup;

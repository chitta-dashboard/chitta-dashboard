import { useState } from "react";

import TablePageHeader from "../../components/common-table-page-header";
import AddFarmersGroupModal from "../../components/modals/farmers-group-modal";
import { IAddFarmersGroupFormInput } from "../../components/modals/type/formInputs";
import FarmersGroupTable from "../../components/tables/farmers-group-table";
import { useFarmerGroupDetailsContext } from "../../utils/context/farmersGroup";

import S from "./farmersGroup.styled";

const FarmersGroup = () => {
  const [addModal, setAddModal] = useState(false);
  const { addFarmerGroupDetail, setSearchFilter, setSortFilter, sortFilter } = useFarmerGroupDetailsContext();

  //Add Modal Handler
  const addModalHandler = () => {
    setAddModal(!addModal);
  };

  // Add Farmergroup Handler
  const addDataHandler = (data: IAddFarmersGroupFormInput & { id: string }) => {
    addFarmerGroupDetail(data);
  };

  return (
    <>
      <S.FarmersGroupContainer>
        <TablePageHeader addModalHandler={addModalHandler} searchHandler={setSearchFilter} sortHandler={setSortFilter} sortFilter={sortFilter} />
        <FarmersGroupTable />
      </S.FarmersGroupContainer>
      <AddFarmersGroupModal openModal={addModal} handleClose={addModalHandler} cb={addDataHandler} />
    </>
  );
};

export default FarmersGroup;

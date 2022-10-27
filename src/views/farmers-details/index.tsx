import { useState } from "react";
import { farmerDetail, useFarmerDetailsContext } from "../../utils/context/farmersDetails";
import { useFarmersGroupContext } from "../../utils/context/farmersGroup";
import { useAuthContext } from "../../utils/context/auth";
import { Message } from "../../utils/constants";
import FarmersDetailsTablePageHeader from "../../components/table-page-header/farmers-details-table-page-header";
import FarmersDetailsTable from "../../components/tables/farmers-details-table";
import AddFarmersDetailsModal from "../../components/modals/farmers-details-modal";
import ShareAmountModal from "../../components/modals/share-amount-modal";
import S from "./farmersDetails.styled";

const FarmersDetails = () => {
  const { addFarmerDetail, setSearchFilter, sortFilter, setSortFilter } = useFarmerDetailsContext();
  const { addGroupMember } = useFarmersGroupContext();
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
    addFarmerDetail(data);
    addNotification({ id: data.id, image: data.profile, message: Message(data.name).addFarmDetail });
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

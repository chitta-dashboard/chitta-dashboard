import { useState } from "react";
import TablePageHeader from "../../components/common-table-page-header";
import AddMdDetailsModal from "../../components/modals/new-md-details-modal";
import ConfirmationModal from "../../components/modals/confirmation-modal";
import MdDetailsTable from "../../components/tables/md-details-table";
import { useMdDetailsContext } from "../../utils/context/mdDetails";
import S from "./mdDetails.styled";

const MdDetails = () => {
  const [addModal, setAddModal] = useState(false);
  const { setSearchFilter, sortFilter, setSortFilter } = useMdDetailsContext();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  const addModalHandler = () => {
    setAddModal(!addModal);
  };

  const confirmModalHandler = () => {
    setIsConfirmModalOpen(!isConfirmModalOpen);
    addModalHandler();
  };

  return (
    <>
      <S.MdDetailsContainer>
        <TablePageHeader addModalHandler={addModalHandler} searchHandler={setSearchFilter} sortHandler={setSortFilter} sortFilter={sortFilter} />
        <MdDetailsTable />
      </S.MdDetailsContainer>
      <AddMdDetailsModal openModal={addModal} handleClose={addModalHandler} handleConfirmModal={confirmModalHandler} />
      <ConfirmationModal openModal={isConfirmModalOpen} handleClose={confirmModalHandler} yesAction={() => {}} />
    </>
  );
};

export default MdDetails;

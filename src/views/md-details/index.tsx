import { useState } from "react";

import TablePageHeader from "../../components/common-table-page-header";
import AddMdDetailsModal from "../../components/modals/md-details-modal";
import MdDetailsTable from "../../components/tables/md-details-table";
import { MdDetailsContextProvider, useMdDetailsContext } from "../../utils/context/mdDetails";
import { IAddMDDetailsFormInput } from "../../components/modals/type/formInputs";

import S from "./mdDetails.styled";

const MdDetails = () => {
  const [addModal, setAddModal] = useState(false);
  const { addMdDetail } = useMdDetailsContext();

  const addModalHandler = () => {
    setAddModal(!addModal);
  };
  const addDataHandler = (data: IAddMDDetailsFormInput & { id: string }) => {
    addMdDetail(data);
  };

  return (
    <MdDetailsContextProvider>
      <S.MdDetailsContainer>
        <TablePageHeader addModalHandler={addModalHandler} />
        <MdDetailsTable />
      </S.MdDetailsContainer>
      <AddMdDetailsModal openModal={addModal} handleClose={addModalHandler} cb={addDataHandler} />
    </MdDetailsContextProvider>
  );
};

export default MdDetails;

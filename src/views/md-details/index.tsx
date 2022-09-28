import React, { useState } from "react";
import TablePageHeader from "../../components/common-table-page-header";
import AddMdDetailsModal from "../../components/modals/md-details-modal";
import MdDetailsTable from "../../components/tables/md-details-table";
import { MdDetailsContextProvider } from "../../utils/context/md-details";

import S from "./mdDetails.styled";

const MdDetails = () => {
  const [addMdDetails, setAddMdDetails] = useState(false);

  const addMdDetailsModalHandler = () => {
    setAddMdDetails(!addMdDetails);
  };

  return (
    <MdDetailsContextProvider>
      <S.MdDetailsContainer>
        <TablePageHeader addMdDetailsModalHandler={addMdDetailsModalHandler} />
        <MdDetailsTable />
        <AddMdDetailsModal openModal={addMdDetails} handleClose={addMdDetailsModalHandler} cb={() => {}} />
      </S.MdDetailsContainer>
    </MdDetailsContextProvider>
  );
};

export default MdDetails;

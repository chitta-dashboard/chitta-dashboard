import React, { useState } from "react";

import TablePageHeader from "../../components/common-table-page-header";
import AddMdDetailsModal from "../../components/modals/add-md-details-modal";
import MdDetailsTable from "../../components/tables/md-details-table";

import S from "./mdDetails.styled";

const MdDetails = () => {
  const [addMdDetails, setAddMdDetails] = useState(false);

  const addMdDetailsModalHandler = () => {
    setAddMdDetails(!addMdDetails);
  };

  return (
    <S.MdDetailsContainer>
      <TablePageHeader addMdDetailsModalHandler={addMdDetailsModalHandler} />
      <MdDetailsTable />
      <AddMdDetailsModal openModal={addMdDetails} handleClose={addMdDetailsModalHandler} />
    </S.MdDetailsContainer>
  );
};

export default MdDetails;

import React from "react";
import TablePageHeader from "../../components/common-table-page-header";
import MdDetailsTable from "../../components/tables/md-details-table";

import S from "./mdDetails.styled";

const FarmersGroup = () => {
  return (
    <S.MdDetailsContainer>
      <TablePageHeader />
      <MdDetailsTable />
    </S.MdDetailsContainer>
  );
};

export default FarmersGroup;

import React from "react";
import TablePageHeader from "../../components/common-table-page-header";
import FarmersGroupTable from "../../components/tables/farmers-group-table";

import S from "./farmersGroup.styled";

const MdDetails = () => {
  return (
    <S.FarmersGroupContainer>
      <TablePageHeader />
      <FarmersGroupTable />
    </S.FarmersGroupContainer>
  );
};

export default MdDetails;

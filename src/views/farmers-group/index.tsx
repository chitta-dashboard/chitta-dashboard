import React from "react";
import TablePageHeader from "../../components/common-table-page-header";
import FarmersGroupTable from "../../components/tables/farmers-group-table";

import S from "./farmersGroup.styled";

const FarmersGroup = () => {
  return (
    <S.FarmersGroupContainer>
      <TablePageHeader />
      <FarmersGroupTable />
    </S.FarmersGroupContainer>
  );
};

export default FarmersGroup;

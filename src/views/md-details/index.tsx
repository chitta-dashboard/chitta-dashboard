import React from "react";
import PageHeader from "../../components/table-page-header";
import MdDetailsTable from "../../components/tables/md-details-table";
import S from "./mdDetails.styled";

const MdDetails = () => {
  return (
    <S.MdDetailsContainer>
      <PageHeader />
      <MdDetailsTable />
    </S.MdDetailsContainer>
  );
};

export default MdDetails;


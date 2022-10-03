import { useState } from "react";

import TablePageHeader from "../../components/common-table-page-header";
import AddMdDetailsModal from "../../components/modals/md-details-modal";
import FoundersTable from "../../components/tables/founders-table";
import { useFounderContext } from "../../utils/context/founders";
import { IAddMDDetailsFormInput } from "../../components/modals/type/formInputs";

import S from "./founders.styled";

const Founders = () => {
  const [addModal, setAddModal] = useState(false);
  const { addMdDetail, setSearchFilter, sortFilter, setSortFilter } = useFounderContext();

  const addModalHandler = () => {
    setAddModal(!addModal);
  };

  const addDataHandler = (data: IAddMDDetailsFormInput & { id: string }) => {
    addMdDetail(data);
  };

  return (
    <>
      <S.foundersContainer>
        <TablePageHeader addModalHandler={addModalHandler} searchHandler={setSearchFilter} sortHandler={setSortFilter} sortFilter={sortFilter} />
        <FoundersTable />
      </S.foundersContainer>
      <AddMdDetailsModal openModal={addModal} handleClose={addModalHandler} cb={addDataHandler} />
    </>
  );
};

export default Founders;

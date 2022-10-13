import { useState } from "react";
import TablePageHeader from "../../components/common-table-page-header";
import FoundersModal from "../../components/modals/founders-modal";
import FoundersTable from "../../components/tables/founders-table";
import { useFounderContext } from "../../utils/context/founders";
import { IAddCEODetailsFormInput } from "../../components/modals/type/formInputs";
import S from "./founders.styled";

const Founders = () => {
  const [addModal, setAddModal] = useState(false);
  const { addFounder, setSearchFilter, sortFilter, setSortFilter } = useFounderContext();

  const addModalHandler = () => {
    setAddModal(!addModal);
  };

  const addDataHandler = (data: IAddCEODetailsFormInput & { id: string }) => {
    addFounder(data);
  };

  return (
    <>
      <S.foundersContainer>
        <TablePageHeader addModalHandler={addModalHandler} searchHandler={setSearchFilter} sortHandler={setSortFilter} sortFilter={sortFilter} />
        <FoundersTable />
      </S.foundersContainer>
      <FoundersModal openModal={addModal} handleClose={addModalHandler} cb={addDataHandler} />
    </>
  );
};

export default Founders;

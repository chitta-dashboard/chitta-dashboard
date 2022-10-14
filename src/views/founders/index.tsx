import { useState } from "react";
import TablePageHeader from "../../components/common-table-page-header";
import FoundersModal from "../../components/modals/founders-modal";
import FoundersTable from "../../components/tables/founders-table";
import { useFounderContext } from "../../utils/context/founders";
import { IAddCEODetailsFormInput } from "../../components/modals/type/formInputs";
import { useAuthContext } from "../../utils/context/auth";
import { Message } from "../../utils/constants";
import S from "./founders.styled";

const Founders = () => {
  const { addFounder, setSearchFilter, sortFilter, setSortFilter } = useFounderContext();
  const { addNotification } = useAuthContext();
  const [addModal, setAddModal] = useState(false);

  const addModalHandler = () => {
    setAddModal(!addModal);
  };

  const addDataHandler = (data: IAddCEODetailsFormInput & { id: string }) => {
    addFounder(data);
    addNotification({
      id: data.id,
      image: data.profile,
      message: Message(data.name).addFoundersDetails,
    });
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

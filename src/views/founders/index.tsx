import { useState } from "react";
import TablePageHeader from "../../components/common-table-page-header";
import FoundersModal from "../../components/modals/founders-modal";
import FoundersTable from "../../components/tables/founders-table";
import { useFounderContext } from "../../utils/context/founders";
import { IAddCEODetailsFormInput } from "../../components/modals/type/formInputs";
import { useAuthContext } from "../../utils/context/auth";
import { ENDPOINTS, Message } from "../../utils/constants";
import { useAdd, useFetch } from "../../utils/hooks/query";
import S from "./founders.styled";
import Loader from "../../components/loader";

const Founders = () => {
  const { formatChangeSuccess: isSuccess } = useFetch(ENDPOINTS.founders);
  const { setSearchFilter, sortFilter, setSortFilter } = useFounderContext();
  const { addNotification } = useAuthContext();
  const [addModal, setAddModal] = useState(false);

  const { mutate: founderMutateAdd } = useAdd(ENDPOINTS.founders);

  const addModalHandler = () => {
    setAddModal(!addModal);
  };

  const addDataHandler = (data: IAddCEODetailsFormInput & { id: string }) => {
    // addFounder(data);
    founderMutateAdd({
      data,
      successCb: () => {
        addNotification({
          id: data.id,
          image: data.profile,
          message: Message(data.name).addFoundersDetails,
        });
      },
    });
  };

  return (
    <>
      {!isSuccess ? (
        <Loader />
      ) : (
        <S.foundersContainer>
          <TablePageHeader addModalHandler={addModalHandler} searchHandler={setSearchFilter} sortHandler={setSortFilter} sortFilter={sortFilter} />
          <FoundersTable />
        </S.foundersContainer>
      )}
      <FoundersModal openModal={addModal} handleClose={addModalHandler} cb={addDataHandler} />
    </>
  );
};

export default Founders;

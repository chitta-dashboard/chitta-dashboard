import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import S from "./founders.styled";
import TablePageHeader from "../../components/common-table-page-header";
import FoundersModal from "../../components/modals/founders-modal";
import { IAddFounderDetailsFormInput } from "../../components/modals/type/formInputs";
import FoundersTable from "../../components/tables/founders-table";
import { ENDPOINTS, Message } from "../../utils/constants";
import { useAuthContext } from "../../utils/context/auth";
import { useFounderContext } from "../../utils/context/founders";
import { useAdd, useFetch } from "../../utils/hooks/query";
import Loader from "../../utils/loaders/tree-loader";
import Toast from "../../utils/toast";

const Founders = () => {
  // constants
  const toastId = "toastId";
  // Queries
  const queryClient = useQueryClient();
  const { formatChangeSuccess: isSuccess } = useFetch(ENDPOINTS.founders);
  const { mutate: founderMutateAdd } = useAdd(ENDPOINTS.founders);
  // state values
  const { setSearchFilter, sortFilter, currentPage, setSortFilter } = useFounderContext();
  const { addNotification } = useAuthContext();
  const [addModal, setAddModal] = useState(false);

  const addModalHandler = () => {
    setAddModal(!addModal);
  };

  const addDataHandler = (data: IAddFounderDetailsFormInput & { id: string }) => {
    founderMutateAdd({
      data,
      successCb: () => {
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: [`${ENDPOINTS.founders}-fetch-${currentPage}`] });
        }, 0);
        addNotification({
          id: `add_${data.id}`,
          image: data.profile,
          message: Message(data.name).addFoundersDetails,
        });
        Toast({ message: "Founder Added Successfully", type: "success", customId: `${toastId}-founderAdd` });
      },
      errorCb: () => {
        Toast({ message: "Request failed! Please try again", type: "error", customId: `${toastId}-founderAddFail` });
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

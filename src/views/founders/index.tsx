import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import TablePageHeader from "../../components/common-table-page-header";
import FoundersModal from "../../components/modals/founders-modal";
import FoundersTable from "../../components/tables/founders-table";
import { useFounderContext } from "../../utils/context/founders";
import { IAddFounderDetailsFormInput } from "../../components/modals/type/formInputs";
import { useAuthContext } from "../../utils/context/auth";
import { ENDPOINTS, Message } from "../../utils/constants";
import { useAdd, useFetch } from "../../utils/hooks/query";
import Toast from "../../utils/toast";
import S from "./founders.styled";
import Loader from "../../utils/loaders/tree-loader";

const Founders = () => {
  const { formatChangeSuccess: isSuccess } = useFetch(ENDPOINTS.founders);
  const { setSearchFilter, sortFilter, currentPage, setSortFilter } = useFounderContext();
  const { addNotification } = useAuthContext();
  const [addModal, setAddModal] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: founderMutateAdd } = useAdd(ENDPOINTS.founders);

  const addModalHandler = () => {
    setAddModal(!addModal);
  };

  const addDataHandler = (data: IAddFounderDetailsFormInput & { id: string }) => {
    // addFounder(data);
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
        Toast({ message: "Founder Added Successfully", type: "success" });
      },
      errorCb: () => {
        Toast({ message: "Request failed! Please try again", type: "error" });
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

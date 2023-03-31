import { useEffect, useState } from "react";
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
import { handleLoader } from "../../utils/helpers";

const Founders = () => {
  //state values
  const { addNotification } = useAuthContext();
  const { setSearchFilter } = useFounderContext();
  const [addModal, setAddModal] = useState(false);
  const [isLoader, setIsLoader] = useState(true);

  //constants
  const { formatChangeSuccess: isSuccess } = useFetch(ENDPOINTS.founders);
  const { mutate: founderMutateAdd } = useAdd(ENDPOINTS.founders);
  
  //functions
  const addModalHandler = () => {
    setAddModal(!addModal);
  };

  const addDataHandler = (data: IAddFounderDetailsFormInput & { id: string }) => {
    founderMutateAdd({
      data,
      successCb: () => {
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

  useEffect(() => {
    !isSuccess && handleLoader(setIsLoader);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <>
      {!isSuccess ? (
        isLoader ? (
          <Loader />
        ) : (
          <S.NoDataFound>No Data Found!</S.NoDataFound>
        )
      ) : (
        <S.foundersContainer>
          <TablePageHeader addModalHandler={addModalHandler} searchHandler={setSearchFilter} />
          <FoundersTable />
        </S.foundersContainer>
      )}
      <FoundersModal openModal={addModal} handleClose={addModalHandler} cb={addDataHandler} />
    </>
  );
};

export default Founders;

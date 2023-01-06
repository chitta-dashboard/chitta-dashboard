import { Fragment, useState } from "react";
import CeoDetailsCard from "./CeoDetailCard";
import AddCeoDetailsModal from "../../components/modals/ceo-details-modal";
import { IAddCEODetailsFormInput } from "../../components/modals/type/formInputs";
import Loader from "../../utils/loaders/tree-loader";
import { ENDPOINTS, Message } from "../../utils/constants";
import { useAuthContext } from "../../utils/context/auth";
import { useFetch, useAdd } from "../../utils/hooks/query";
import S from "./ceo-details.styled";
import Toast from "../../utils/toast";

const CeoDetails = () => {
  const toastId = "toastId";
  const {
    formatChangeSuccess,
    result: { data: ceoDetails },
  } = useFetch(ENDPOINTS.ceo);
  const { mutate: ceoAdd } = useAdd(ENDPOINTS.ceo);
  const { addNotification } = useAuthContext();
  const [addModal, setAddModal] = useState(false);

  const addModalHandler = () => {
    setAddModal(!addModal);
  };

  const addDataHandler = (data: IAddCEODetailsFormInput & { id: string }) => {
    ceoAdd({
      data: data,
      successCb: () => {
        Toast({ message: "CEO added successfully.", type: "success", customId: `${toastId}-ceoaddSuccess` });
      },
      errorCb: () => {
        Toast({ message: "Request failed, please try again.", type: "error", customId: `${toastId}-ceoaddFail` });
      },
    });
    addNotification({ id: `add_${data.id}`, image: data.profile, message: Message(data.name).addCeoDetails });
  };
  return (
    <>
      {formatChangeSuccess ? (
        <S.CeoDetailsContainer>
          {Object.values(ceoDetails).map((user: any) => {
            return (
              <Fragment key={user.id}>
                <CeoDetailsCard user={user} />
              </Fragment>
            );
          })}
          <S.CeoDetailAdd>
            <S.CustomButton
              onClick={() => {
                addModalHandler();
              }}
            >
              +
            </S.CustomButton>
          </S.CeoDetailAdd>
          <AddCeoDetailsModal openModal={addModal} handleClose={addModalHandler} cb={addDataHandler} />
        </S.CeoDetailsContainer>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CeoDetails;

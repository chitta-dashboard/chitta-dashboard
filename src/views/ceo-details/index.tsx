import { Fragment, useState } from "react";
import { useCeoDetailsContext } from "../../utils/context/ceoDetails";
import CeoDetailsCard from "./CeoDetailCard";
import AddCeoDetailsModal from "../../components/modals/ceo-details-modal";
import { IAddCEODetailsFormInput } from "../../components/modals/type/formInputs";
import { Message } from "../../utils/constants";
import { useAuthContext } from "../../utils/context/auth";
import S from "./ceo-details.styled";

const CeoDetails = () => {
  const { addNotification } = useAuthContext();
  const { ceoDetailsById, addCeoDetail } = useCeoDetailsContext();
  const [addModal, setAddModal] = useState(false);

  const addModalHandler = () => {
    setAddModal(!addModal);
  };

  const addDataHandler = (data: IAddCEODetailsFormInput & { id: string }) => {
    addCeoDetail(data);
    addNotification({ id: data.id, image: data.profile, message: Message(data.name).addCeoDetails });
  };

  return (
    <S.CeoDetailsContainer>
      <>
        {Object.values(ceoDetailsById).map((user) => {
          return (
            <Fragment key={user.id}>
              <CeoDetailsCard user={user} />
            </Fragment>
          );
        })}
      </>
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
  );
};

export default CeoDetails;

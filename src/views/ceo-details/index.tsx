import { Fragment, useState } from "react";
import { useCeoDetailsContext } from "../../utils/context/ceoDetails";
import CeoDetailsCard from "./CeoDetailCard";
import AddCeoDetailsModal from "../../components/modals/ceo-details-modal";
import { IAddCEODetailsFormInput } from "../../components/modals/type/formInputs";
import S from "./ceo-details.styled";

const CeoDetails = () => {
  const [addModal, setAddModal] = useState(false);
  const { ceoDetailsById, addCeoDetail } = useCeoDetailsContext();

  const addModalHandler = () => {
    setAddModal(!addModal);
  };

  const addDataHandler = (data: IAddCEODetailsFormInput & { id: string }) => {
    addCeoDetail(data);
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

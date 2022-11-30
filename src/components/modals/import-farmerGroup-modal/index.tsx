import { FC } from "react";
import CustomModal from "../../custom-modal";
import ModalBody from "../../custom-modal/body";
import ModalHeader from "../../custom-modal/header";
import S from "./importFarmerGroupModal.styled";

interface Props {
  openModal: boolean;
  handleClose: () => void;
  groups?: string[] | undefined;
}

const ImportFarmerGroupModal: FC<Props> = ({ openModal, handleClose, groups }) => {
  return (
    <>
      <CustomModal openModal={openModal}>
        <ModalHeader handleClose={handleClose}>New Groups</ModalHeader>
        <S.ConfirmationText>Do you want to create the following groups ?</S.ConfirmationText>
        <ModalBody>
          <S.Container>{groups && groups.length > 0 ? groups?.map((i, index) => <S.Chips label={i} key={index} />) : "No new groups"}</S.Container>
        </ModalBody>
        <S.ButtonContainer direction={"row"} spacing={3}>
          <S.NoButton onClick={handleClose}>No</S.NoButton>
          <S.YesButton onClick={handleClose}>Yes</S.YesButton>
        </S.ButtonContainer>
      </CustomModal>
    </>
  );
};

export default ImportFarmerGroupModal;

import { FC } from "react";
import CustomModal from "../../custom-modal";
import ModalBody from "../../custom-modal/body";
import ModalHeader from "../../custom-modal/header";
import S from "./loader.styled";
import LeafLine from "../../../assets/images/leafLine.svg";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
}

const LoaderModal: FC<CustomProps> = ({ openModal, handleClose }) => {
  return (
    <CustomModal openModal={openModal}>
      <ModalHeader handleClose={handleClose}>Loading</ModalHeader>
      <ModalBody>
        <S.AnimationContainer>
          <S.LeafContainer>
            <S.SmallLeaf></S.SmallLeaf>
            <S.BigLeaf></S.BigLeaf>
            <img src={LeafLine} alt="leafLine" />
          </S.LeafContainer>
          <S.StemContainer>
            <S.OuterStem>
              <S.InnerStem></S.InnerStem>
            </S.OuterStem>
          </S.StemContainer>
        </S.AnimationContainer>
      </ModalBody>
    </CustomModal>
  );
};

export default LoaderModal;

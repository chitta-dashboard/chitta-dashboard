import { FC, useEffect, useRef, useState } from "react";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import S from "./formSelectionModal.styled";
import { Button } from "@mui/material";
import { Checkbox } from "@mui/material";
import FarmerDetailsForm from "../../../views/farmer-detail-page/FarmerDetailsForm";
import { useReactToPrint } from "react-to-print";
import { useFarmerDetailsContext } from "../../../utils/context/farmersDetails";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  farmerId: string;
  cb: () => void;
}

const FormSelectionModal: FC<CustomProps> = ({ openModal, handleClose, farmerId, cb }) => {
  const { setFarmerBankDetail } = useFarmerDetailsContext();

  const [selectFile, setSelectFile] = useState(true);

  const farmerDetailFormRef = useRef<HTMLDivElement>();

  useEffect(() => {
    setFarmerBankDetail(false);
  }, []);

  useEffect(() => {
    if (selectFile) {
      setFarmerBankDetail(true);
    }
  }, [selectFile]);

  const generateFarmerDetailForm = useReactToPrint({
    documentTitle: `Farmer_Detail_form`,
    content: () => farmerDetailFormRef.current as HTMLDivElement,
    onBeforePrint() {
      handleClose();
    },
    onAfterPrint() {
      setFarmerBankDetail(false);
    },
    pageStyle: `@media print {
      @page {
        size: "a4 portrait";
        margin:"0";
      }
    }`,
  });

  return (
    <>
      <S.InvisibleDiv>
        <FarmerDetailsForm ref={farmerDetailFormRef} farmerIdtoPrint={farmerId} />
      </S.InvisibleDiv>
      <CustomModal openModal={openModal} handleClose={handleClose}>
        <ModalHeader handleClose={handleClose}>Select form</ModalHeader>

        <ModalBody id={"passwordConfirmation"} onSubmit={() => {}}>
          <S.SelectionModalBody>
            <S.ModalRow>
              <Checkbox
                checked={selectFile}
                onChange={() => {
                  setSelectFile(!selectFile);
                }}
              />
              <S.ModalText>Farmer Detail form</S.ModalText>
            </S.ModalRow>
            <S.ModalRow>
              <Checkbox
                checked={!selectFile}
                onChange={() => {
                  setSelectFile(!selectFile);
                }}
              />
              <S.ModalText>Greeting certificate</S.ModalText>
            </S.ModalRow>
          </S.SelectionModalBody>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={false}
            onClick={() => {
              if (selectFile) {
                generateFarmerDetailForm();
              } else {
                handleClose();
                cb();
              }
            }}
          >
            <S.ModalText>Ok</S.ModalText>
          </Button>
        </ModalFooter>
      </CustomModal>
    </>
  );
};

export default FormSelectionModal;

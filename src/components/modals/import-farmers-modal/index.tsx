import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { validateFarmerData, exportSampleFormat, downloadRejectedData } from "./helper";
import DropFile from "../../common-components/drop-file";
import ModalBody from "../../custom-modal/body";
import ModalHeader from "../../custom-modal/header";
import CustomModal from "../../custom-modal";
import S from "./importFarmersModal.styled";

interface IImportFarmersModal {
  isOpen: boolean;
  handleClose: () => void;
}

const ImportFarmersModal: React.FC<IImportFarmersModal> = function ({ isOpen, handleClose }) {
  const [importedFile, setImportedFile] = useState<File | null>(null);
  const [openImportGroupModal, setOpenImportGroupModal] = useState<boolean>(false);
  const [existingFarmers, setExistingFarmers] = useState<Object[] | null | undefined>(null);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  let count = existingFarmers?.length;
  const cancelHandler = () => {
    setShowDownloadButton(false);
    handleClose();
  };
  const downloadAndContinueHandler = () => {
    downloadRejectedData();
  };
  useEffect(() => {
    if (existingFarmers && existingFarmers.length > 0) {
      setShowDownloadButton(true);
    }
  }, [existingFarmers]);
  return (
    <CustomModal openModal={isOpen}>
      <ModalHeader handleClose={handleClose}>Import Farmers</ModalHeader>
      <ModalBody>
        {showDownloadButton && count ? (
          <S.OptionalContainer>
            <S.DialogueText>
              It looks like <S.Highlite>{count}</S.Highlite> farmer(s) have already used the entered mobile number. Click the{" "}
              <S.Highlite>Download & Continue</S.Highlite> button to get their list and register the remaining farmers.
            </S.DialogueText>
            <S.DownloadButton onClick={downloadAndContinueHandler}>Download & continue</S.DownloadButton>
            <S.CancelButton onClick={cancelHandler}>Cancel</S.CancelButton>
          </S.OptionalContainer>
        ) : (
          <S.Body>
            <Typography>Click the below button to download the sample format structure of import farmers excel sheet.</Typography>
            <S.Button title="Download Format Sample Sheet" onClick={exportSampleFormat}>
              Download Sample
            </S.Button>
            <DropFile
              cb={(file: File) => setImportedFile(file)}
              validate={validateFarmerData}
              openModal={openImportGroupModal}
              setOpenModal={setOpenImportGroupModal}
              setExistingFarmers={setExistingFarmers}
              handleCloseImport={handleClose}
            />
            <S.Button disabled={importedFile === null} onClick={() => setOpenImportGroupModal(true)}>
              Import
            </S.Button>
          </S.Body>
        )}
      </ModalBody>
    </CustomModal>
  );
};

export default ImportFarmersModal;

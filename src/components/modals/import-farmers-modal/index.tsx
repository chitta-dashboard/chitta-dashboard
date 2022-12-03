import { Typography } from "@mui/material";
import { useState } from "react";
import { validateFarmerData, exportSampleFormat } from "./helper";
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

  return (
    <CustomModal openModal={isOpen}>
      <ModalHeader handleClose={handleClose}>Import Farmers</ModalHeader>
      <ModalBody>
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
          />
          <S.Button disabled={importedFile === null} onClick={() => setOpenImportGroupModal(true)}>
            Import
          </S.Button>
        </S.Body>
      </ModalBody>
    </CustomModal>
  );
};

export default ImportFarmersModal;

import { Typography } from "@mui/material";
import {  useState } from "react";
import DropFile from "../../common-components/drop-file";
import CustomModal from "../../custom-modal";
import ModalBody from "../../custom-modal/body";
import ModalHeader from "../../custom-modal/header";
import { validateFarmerData, processFarmerData, exportSampleFormat } from "./helper";
import { getJSONfromExcel } from "../../../utils/constants";
import { farmerDetail } from "../../../utils/context/farmersDetails";
import S from "./importFarmersModal.styled";

interface IImportFarmersModal {
  isOpen: boolean;
  handleClose: () => void;
  cb: (file: farmerDetail[]) => void;
}

const ImportFarmersModal: React.FC<IImportFarmersModal> = function ({ isOpen, handleClose, cb }) {
  const [importedFile, setImportedFile] = useState<File | null>(null);

  return (
      <CustomModal openModal={isOpen}>
        <ModalHeader handleClose={handleClose}>Import Farmers</ModalHeader>
        <ModalBody>
          <S.Body>
            <Typography>Click the below button to download the sample format structure of import farmers excel sheet.</Typography>
            <S.Button title="Download Format Sample Sheet" onClick={exportSampleFormat}>
              Download Sample
            </S.Button>
            <DropFile cb={(file: File) => setImportedFile(file)} validate={validateFarmerData} />
            <S.Button
              disabled={importedFile === null}
              onClick={async () => {
                const farmers = await getJSONfromExcel(importedFile!);
                cb(processFarmerData(farmers));
              }}
            >
              Import
            </S.Button>
          </S.Body>
        </ModalBody>
      </CustomModal>
  );
};

export default ImportFarmersModal;

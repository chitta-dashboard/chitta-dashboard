import { FileDownload } from "@mui/icons-material";
import { useState } from "react";
import DropFile from "../../common-components/drop-file";
import CustomModal from "../../custom-modal";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import ModalHeader from "../../custom-modal/header";
import { validateFarmerData, processFarmerData, exportSampleFormat } from "./helper";
import { getJSONfromExcel } from "../../../utils/constants";
import { farmerDetail } from "../../../utils/store/slice/farmerDetails";
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
        <DropFile cb={(file: File) => setImportedFile(file)} validate={validateFarmerData} />
      </ModalBody>
      <ModalFooter>
        <S.ButtonBox>
          <S.DownloadBtn title="Download Format Sample Sheet" onClick={exportSampleFormat}>
            <FileDownload />
          </S.DownloadBtn>
          <S.ImportBtn
            disabled={importedFile === null}
            onClick={async () => {
              const farmers = await getJSONfromExcel(importedFile!);
              cb(processFarmerData(farmers));
            }}
          >
            Import
          </S.ImportBtn>
        </S.ButtonBox>
      </ModalFooter>
    </CustomModal>
  );
};

export default ImportFarmersModal;

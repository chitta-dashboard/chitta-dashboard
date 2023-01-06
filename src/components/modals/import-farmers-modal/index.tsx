import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { v4 as uuid } from "uuid";
import S from "./importFarmersModal.styled";
import { encryptText, ENDPOINTS } from "../../../utils/constants";
import { farmerDetail } from "../../../utils/context/farmersDetails";
import { useFetch } from "../../../utils/hooks/query";
import DropFile from "../../common-components/drop-file";
import CustomModal from "../../custom-modal";
import ModalBody from "../../custom-modal/body";
import ModalHeader from "../../custom-modal/header";
import ImportFarmerGroupModal from "../import-farmerGroup-modal";
import { validateFarmerData, exportSampleFormat, downloadRejectedData } from "./helper";

interface IImportFarmersModal {
  isOpen: boolean;
  handleClose: () => void;
}

const ImportFarmersModal: React.FC<IImportFarmersModal> = function ({ isOpen, handleClose }) {
  // state values
  const [importedFile, setImportedFile] = useState<File | null>(null);
  const [openImportGroup, setOpenImportGroup] = useState<boolean>(false);
  const [existingFarmers, setExistingFarmers] = useState<Object[] | null | undefined>(null);
  const [verifiedNewFarmers, setVerifiedNewFarmers] = useState<farmerDetail[] | undefined>(undefined);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [newGroupNames, setNewGroupNames] = useState<string[] | undefined>(undefined);
  const [inputData, setInputData] = useState<farmerDetail[] | undefined>(undefined);
  const [newFarmersDatas, setNewFarmersDatas] = useState<farmerDetail[] | null>(null);
  const [count, setCount] = useState(existingFarmers?.length);
  // Queries
  const {
    result: { data: farmersDetailsById },
    formatChangeSuccess: isSuccess,
  } = useFetch(ENDPOINTS.farmerDetails);

  const dataLength = isSuccess && Object.values(farmersDetailsById).length;
  const lastPageData: farmerDetail[] | false = isSuccess && Object.values(farmersDetailsById);

  const lastMembershipId = isSuccess && (lastPageData as farmerDetail[])[(dataLength as number) - 1]["membershipId"].split("-")[2];
  let newMemberId = parseInt(lastMembershipId as string);

  const cancelHandler = () => {
    setShowDownloadButton(false);
    handleClose();
  };

  const downloadAndContinueHandler = () => {
    if (count && count > 0) {
      downloadRejectedData();
      setInputData(verifiedNewFarmers);
      setOpenImportGroup(true);
    } else {
      downloadRejectedData();
    }
  };

  const importButtonHandler = () => {
    setOpenImportGroup(true);
  };

  useEffect(() => {
    if (verifiedNewFarmers && verifiedNewFarmers?.length > 0) {
      setShowDownloadButton(true);
      setCount(verifiedNewFarmers.length);
      setInputData(verifiedNewFarmers);
    }
  }, [verifiedNewFarmers, count]);

  useEffect(() => {
    if (inputData) {
      let farmerId: string;
      let farmer: farmerDetail;
      let newFarmerDetailsDatas: farmerDetail[] = [];
      // eslint-disable-next-line array-callback-return
      inputData?.map((item, i) => {
        let id = uuid();
        farmerId = id;
        // creating farmerDetails db structure
        farmer = {
          ...item,
          id: farmerId,
          profile: "",
          membershipId: `NER-FPC-${newMemberId + (i + 1)}`,
          accountNumber: encryptText(item.accountNumber as string),
          nameAsPerBank: "",
          bankName: "",
          ifscCode: "",
        };
        newFarmerDetailsDatas.push(farmer);
      });
      setNewFarmersDatas(newFarmerDetailsDatas);
    }
  }, [inputData, newMemberId]);

  useEffect(() => {
    if (existingFarmers && existingFarmers.length > 0) {
      setShowDownloadButton(true);
    }
  }, [existingFarmers]);

  return (
    <>
      <CustomModal openModal={isOpen}>
        <ModalHeader handleClose={handleClose}>Import Farmers</ModalHeader>
        <ModalBody>
          {showDownloadButton ? (
            <S.OptionalContainer>
              <S.DialogueText>
                It looks like <S.Highlite>{existingFarmers?.length}</S.Highlite> farmer(s) have already used the entered mobile{" "}
                <S.HighlightText>/</S.HighlightText> aadhaar number. Click the{" "}
                <S.Highlite>{count && count > 0 ? "Download & continue" : "Download"}</S.Highlite>{" "}
                {count && count > 0 ? "button to get their list and register the remaining farmers." : "button to get the list"}
              </S.DialogueText>
              <S.DownloadButton onClick={downloadAndContinueHandler}>{count && count > 0 ? "Download & continue" : "Download"}</S.DownloadButton>
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
                setInputData={setInputData}
                setNewGroupNames={setNewGroupNames}
                setExistingFarmers={setExistingFarmers}
                setVerifiedNewFarmers={setVerifiedNewFarmers}
                isGroupMoalOpened={openImportGroup}
              />
              <S.Button disabled={importedFile === null} onClick={importButtonHandler}>
                Import
              </S.Button>
            </S.Body>
          )}
        </ModalBody>
      </CustomModal>
      <ImportFarmerGroupModal
        openModal={openImportGroup}
        handleClose={() => setOpenImportGroup(!openImportGroup)}
        newGroupNames={newGroupNames} // for display the group names in chips
        setNewGroupNames={setNewGroupNames}
        count={newFarmersDatas && newFarmersDatas.length} // for toast message
        handleCloseImport={handleClose}
        farmerDatas={newFarmersDatas}
        setInputData={setInputData}
      />
    </>
  );
};

export default ImportFarmersModal;

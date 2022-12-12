import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { validateFarmerData, exportSampleFormat, downloadRejectedData } from "./helper";
import ImportFarmerGroupModal from "../import-farmerGroup-modal";
import DropFile from "../../common-components/drop-file";
import ModalBody from "../../custom-modal/body";
import ModalHeader from "../../custom-modal/header";
import CustomModal from "../../custom-modal";
import { farmerDetail } from "../../../utils/context/farmersDetails";
import { FarmersGroup } from "../../../utils/context/farmersGroup";
import S from "./importFarmersModal.styled";
import { useFetch } from "../../../utils/hooks/query";
import { encryptText, ENDPOINTS } from "../../../utils/constants";

interface IImportFarmersModal {
  isOpen: boolean;
  handleClose: () => void;
}

const ImportFarmersModal: React.FC<IImportFarmersModal> = function ({ isOpen, handleClose }) {
  const [importedFile, setImportedFile] = useState<File | null>(null);
  const [openImportGroup, setOpenImportGroup] = useState<boolean>(false);
  const [existingFarmers, setExistingFarmers] = useState<Object[] | null | undefined>(null);
  const [verifiedNewFarmers, setVerifiedNewFarmers] = useState<farmerDetail[] | undefined>(undefined);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [newGroupNames, setNewGroupNames] = useState<string[] | undefined>(undefined);
  const [inputData, setInputData] = useState<farmerDetail[] | undefined>(undefined);
  const [newFarmerGroupDatas, setNewFarmerGroupDatas] = useState<FarmersGroup[] | null>(null);
  const [newFarmersDatas, setNewFarmersDatas] = useState<farmerDetail[] | null>(null);
  const [count, setCount] = useState(existingFarmers?.length);
  const {
    result: { data: farmersDetailsById },
    formatChangeSuccess: isSuccess,
  } = useFetch(ENDPOINTS.farmerDetails);

  const dataLength = isSuccess && Object.values(farmersDetailsById).length;
  const lastPageData: farmerDetail[] | false = isSuccess && Object.values(farmersDetailsById);

  const lastMembershipId =
    isSuccess && (((lastPageData as farmerDetail[])[(dataLength as number) - 1] as farmerDetail)["membershipId"] as string).split("-")[2];
  let newMemberId = parseInt(lastMembershipId as string);

  const cancelHandler = () => {
    setShowDownloadButton(false);
    handleClose();
  };

  const downloadAndContinueHandler = () => {
    downloadRejectedData();
    setInputData(verifiedNewFarmers);
    setOpenImportGroup(true);
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
      let farmerGroup: FarmersGroup;
      let newFarmerDetailsDatas: farmerDetail[] = [];
      let newFarmerGroupDatas: FarmersGroup[] = [];

      // creating the new datas for farmerdDetails & farmerGroup
      // eslint-disable-next-line array-callback-return
      inputData?.map((i) => {
        let id = uuid();
        farmerId = id;

        // creating farmerDetails db structure
        farmer = {
          ...i,
          id: farmerId,
          profile: "",
          membershipId: `NER-FPC-${newMemberId + 1}`,
          accountNumber: encryptText(i.accountNumber as string),
          nameAsPerBank: "",
          bankName: "",
          ifscCode: "",
        };

        // creating farmerGroup db structure
        farmerGroup = { id: uuid(), groupName: i.group, explanation: "", chairman: "", treasurer: "", secretary: "", members: [farmerId] };

        newFarmerDetailsDatas.push(farmer);
        newFarmerGroupDatas.push(farmerGroup);
        newMemberId++;
      });
      setNewFarmersDatas(newFarmerDetailsDatas);
      setNewFarmerGroupDatas(newFarmerGroupDatas);
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
        newGroupNames={newGroupNames && newGroupNames} // for display the group names in chips
        setNewGroupNames={setNewGroupNames}
        count={newFarmersDatas && newFarmersDatas.length} // for toast message
        handleCloseImport={handleClose}
        farmerGroupDatas={newFarmerGroupDatas && newFarmerGroupDatas}
        farmerDatas={newFarmersDatas && newFarmersDatas}
        setInputData={setInputData}
      />
    </>
  );
};

export default ImportFarmersModal;

import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { ENDPOINTS } from "../../../../utils/constants";
import { useAdd, useFetch } from "../../../../utils/hooks/query";
import { RootState } from "../../../../utils/store";
import { farmerDetail } from "../../../../utils/store/slice/farmerDetails";
import ExportCSV from "../../../export-csv-data";
import ConfirmationModal from "../../../modals/confirmation-modal";
import { handleImportData } from "./helper";
import S from "./rightSection.styled";
interface RightSectionProps {
  addModalHandler?: () => void;
  shareAmountModalHandler?: () => void;
}

const RightSection: FC<RightSectionProps> = (props) => {
  const { shareAmountModalHandler, addModalHandler } = props;
  // const { selectedFarmers,farmersDetailsById } = useFarmerDetailsContext();
  const { selectedFarmers, farmersIdToExport } = useSelector((state: RootState) => state.farmerDetails);
  const {
    formatChangeSuccess: isSuccess,
    result: { data: farmersDetailsById },
  } = useFetch(ENDPOINTS.farmerDetails);
  const handleExportData = () => {
    if (isSuccess) {
      let resultData: farmerDetail[] = [];
      farmersIdToExport.forEach((item) => resultData.push(farmersDetailsById[item]));
      return resultData;
    }
  };
  const { mutate } = useAdd(ENDPOINTS.farmerDetails);
  const [importedData, setImportedData] = useState<farmerDetail[] | null>(null);

  handleExportData();
  return (
    <S.RightSectionContainer>
      <S.ButtonStack>
        <S.CustomButton disabled={selectedFarmers.length === 0} onClick={() => shareAmountModalHandler && shareAmountModalHandler()}>
          Share Holder
        </S.CustomButton>
        <S.CustomButton
          onClick={(e) => {
            const fileInput = (e.currentTarget as HTMLButtonElement).querySelector("input") as HTMLInputElement;
            fileInput.click();
          }}
        >
          <p>Import Farmers</p>
          <S.HiddenInput onChange={(e) => handleImportData(e, setImportedData)} type={"file"} accept={".xlsx,.xls"} />
        </S.CustomButton>
        <ExportCSV name="Export Farmers" csvData={isSuccess ? (handleExportData() as farmerDetail[]) : ([] as farmerDetail[])} fileName="Farmers" />
        <S.CustomButton
          onClick={() => {
            if (addModalHandler) addModalHandler();
          }}
        >
          Add
        </S.CustomButton>
      </S.ButtonStack>
      <ConfirmationModal
        openModal={importedData !== null}
        yesAction={() => {
          mutate({ data: importedData });
          setImportedData(null);
        }}
        handleClose={() => setImportedData(null)}
      />
    </S.RightSectionContainer>
  );
};

export default RightSection;

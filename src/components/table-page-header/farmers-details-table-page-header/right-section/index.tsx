import { FC, useCallback, useState } from "react";
import { ENDPOINTS } from "../../../../utils/constants";
import { useAdd, useFetch } from "../../../../utils/hooks/query";
import { farmerDetail, useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import Toast from "../../../../utils/toast";
import ExportCSV from "../../../export-csv-data";
import ConfirmationModal from "../../../modals/confirmation-modal";
import ImportFarmersModal from "../../../modals/import-farmers-modal";
import S from "./rightSection.styled";
interface RightSectionProps {
  addModalHandler?: () => void;
  shareAmountModalHandler?: () => void;
}

const RightSection: FC<RightSectionProps> = (props) => {
  const { shareAmountModalHandler, addModalHandler } = props;
  const { selectedFarmers, farmersIdToExport } = useFarmerDetailsContext();
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
  const { mutate: addNotification } = useAdd(ENDPOINTS.notification);
  const [importedData, setImportedData] = useState<farmerDetail[] | null>(null);
  const [importModalOpen, setImportModalOpen] = useState(false);

  handleExportData();

  const handleImport = useCallback(() => {
    mutate({
      data: importedData,
      successCb: () => {
        Toast({
          message: `${importedData?.length} new farmer${Number(importedData?.length) > 1 ? "s have" : " has"} been registered.`,
          type: "success",
        });
        addNotification({
          data: {
            message: `${importedData?.length} new farmer${Number(importedData?.length) > 1 ? "s have" : " has"} been registered.`,
            id: "add" + importedData![0]?.id,
          },
        });
        setImportedData(null);
        setImportModalOpen(false);
      },
      errorCb: () => {
        Toast({
          message: `Something went wrong, sorry for the inconvenience.`,
          type: "error",
        });
        setImportedData(null);
        setImportModalOpen(false);
      },
    });
  }, [importedData, mutate]);

  return (
    <S.RightSectionContainer>
      <S.ButtonStack>
        <S.CustomButton disabled={selectedFarmers.length === 0} onClick={() => shareAmountModalHandler && shareAmountModalHandler()}>
          Share Holder
        </S.CustomButton>
        <S.CustomButton onClick={() => setImportModalOpen(true)}>Import Farmers</S.CustomButton>
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
        openModal={Number(importedData?.length) > 0}
        yesAction={handleImport}
        confirmMessage={
          <span>
            Do you want to register <S.HightlightText>{importedData?.length}</S.HightlightText> new farmer
            {(importedData?.length as number) > 1 ? "s" : ""}?
          </span>
        }
        handleClose={() => setImportedData(null)}
      />
      {importModalOpen && (
        <ImportFarmersModal isOpen={true} handleClose={() => setImportModalOpen(false)} cb={(data: farmerDetail[]) => setImportedData(data)} />
      )}
    </S.RightSectionContainer>
  );
};

export default RightSection;

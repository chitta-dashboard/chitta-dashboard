import { FC } from "react";
import { useSelector } from "react-redux";
import { ENDPOINTS } from "../../../../utils/constants";
import { useFetch } from "../../../../utils/hooks/query";
import { RootState } from "../../../../utils/store";
import { farmerDetail } from "../../../../utils/store/slice/farmerDetails";
import SelectDropDown from "../../../common-components/select-dropdown";
import ExportCSV from "../../../export-csv-data";
// import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
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
  handleExportData();
  return (
    <S.RightSectionContainer>
      <S.DropdownStack>
        <SelectDropDown />
      </S.DropdownStack>
      <S.ButtonStack>
        <S.CustomButton disabled={selectedFarmers.length === 0} onClick={() => shareAmountModalHandler && shareAmountModalHandler()}>
          Share Holder
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
    </S.RightSectionContainer>
  );
};

export default RightSection;

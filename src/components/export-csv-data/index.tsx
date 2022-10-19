import * as FileSaver from "file-saver";
import { FC } from "react";
import * as XLSX from "xlsx";
import { farmerDetail } from "../../utils/context/farmersDetails";
import S from './exportData.styled';

type ExportCSVType = {
  name:string,
  csvData: farmerDetail[];
  fileName: string;
};

export const ExportCSV: FC<ExportCSVType> = ({name,csvData, fileName }) => {
  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData :farmerDetail[], fileName:string) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <S.ExportDataButton onClick={(e) => exportToCSV(csvData, fileName)}>
     {name}
    </S.ExportDataButton>
  );
};

export default ExportCSV;

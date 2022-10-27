import { width } from "@mui/system";
import * as FileSaver from "file-saver";
import { FC } from "react";
import * as XLSX from "xlsx";
import { number } from "yup";
import { farmerDetail } from "../../utils/context/farmersDetails";
import S from "./exportData.styled";

type ExportCSVType = {
  name: string;
  csvData: farmerDetail[];
  fileName: string;
};

export const ExportCSV: FC<ExportCSVType> = ({ name, csvData, fileName }) => {
  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData: farmerDetail[], fileName: string) => {

    let updatedCSVData:farmerDetail[] = [];

    csvData.map((item) => {
      let newCSVData: any = {};
      let keys = Object.keys(item);
      Object.values(item).map((value, i) => {
        newCSVData[keys[i]] = JSON.stringify(value).split("\"")[1];
      });
      updatedCSVData.push(newCSVData);
    });

    const ws = XLSX.utils.json_to_sheet(updatedCSVData);
    
    let increment: number = 5;
    const colLengths = Object.values(ws).map((k) => k?.v?.toString().length);

    for (const d of Object.keys(ws)) {
      Object.values(d).forEach((element: any, index) => {
        const length = element.toString().length;
        if (colLengths[index] < length) {
          colLengths[index] = length;
        }
      });
    }

    ws["!cols"] = colLengths.map((l) => {
      return {
        wch: l + increment,
      };
    });

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return <S.ExportDataButton onClick={() => exportToCSV(csvData, fileName)}>{name}</S.ExportDataButton>;
};

export default ExportCSV;

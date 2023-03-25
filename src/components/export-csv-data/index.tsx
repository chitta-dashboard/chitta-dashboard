import { saveAs } from "file-saver";
import { FC } from "react";
import * as XLSX from "xlsx";
import { farmerDetail } from "../../utils/context/farmersDetails";
import S from "./exportData.styled";

type ExportCSVType = {
  name: string;
  csvData: farmerDetail[];
  fileName: string;
};

export const ExportCSV: FC<ExportCSVType> = ({ name, csvData, fileName }) => {
  //constants
  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  //functions
  const exportToCSV = (csvData: farmerDetail[], fileName: string) => {
    let updatedCSVData: farmerDetail[] = [];

    csvData.forEach((item) => {
      let newCSVData: any = {};
      let keys = Object.keys(item);
      Object.values(item).forEach((value, i) => {
        let updatedValue = JSON.stringify(value);
        newCSVData[keys[i]] =
          updatedValue.includes("border-first") || updatedValue.includes("acre-first") || updatedValue.includes("surveyNo-first")
            ? JSON.stringify(value)
            : JSON.stringify(value).split('"').join("");
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
    saveAs(data, fileName + fileExtension);
  };

  return <S.ExportDataButton onClick={() => exportToCSV(csvData, fileName)}>{name}</S.ExportDataButton>;
};

export default ExportCSV;

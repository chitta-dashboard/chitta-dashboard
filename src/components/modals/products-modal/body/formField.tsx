import { FC } from "react";
import { Control } from "react-hook-form";
import Input from "../../../input-fields/input/input";
import { PRODUCT_DATA } from "../../../../utils/constants";
import S from "./productsModal.styled";
interface CustomProps {
  control?: Control;
}

const FormField: FC<CustomProps> = ({ control }) => {
  return (
    <S.StaticBox>
      <Input
        name="foodType"
        type="select"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "உணவு வகை *",
          gridArea: "ftp",
          selectOptions: [
            ["Raw", "Raw"],
            ["Processed", "Processed"],
            ["Animal", "Animal"],
          ],
          defaultValue: "Raw",
        }}
      />
      <Input
        name="productName"
        type="autocomplete-with-imagelist"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "பொருளின் பெயர் *",
          gridArea: "prn",
          selectoptions: PRODUCT_DATA,
        }}
      />
      <Input
        name="variant"
        type="select"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "வகை *",
          gridArea: "var",
          selectOptions: [
            ["Basmati", "Basmati"],
            ["Payur-1", "Payur-1"],
            ["Variant-1", "Variant-1"],
            ["Vriant-2", "Variant-2"],
            ["Variant-3", "Variant-3"],
          ],
        }}
      />
      <Input
        name="startDate"
        type="date"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "தொடக்க தேதி *",
          gridArea: "std",
        }}
      />
      <Input
        name="endDate"
        type="date"
        control={control}
        rules={{ required: "required" }}
        options={{
          gridArea: "end",
          label: "கடைசி தேதி *",
        }}
      />
      <Input
        name="availableAmount"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "கையிருப்பு தொகை *",
          gridArea: "ava",
          unit: "kg",
        }}
      />
      <Input
        name="qualityGrade"
        type="select"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "தரம் *",
          gridArea: "qty",
          selectOptions: [
            ["A+", "A+"],
            ["B+", "B+"],
            ["C+", "C+"],
          ],
          defaultValue: "A+",
        }}
      />
      <Input
        name="description"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "விளக்கம் *",
          gridArea: "des",
          fullHeight: true,
        }}
      />
    </S.StaticBox>
  );
};

export default FormField;

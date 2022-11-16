import { FC } from "react";
import { Control } from "react-hook-form";
import Input from "../../../input-fields/input/input";
import { Products } from "../../../../utils/constants";
import S from "./productsModal.styled";
interface CustomProps {
  control?: Control;
}

const FormField: FC<CustomProps> = ({ control }) => {
  return (
    <S.StaticBox>
      <Input
        name="productName"
        type="autocomplete-with-imagelist"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "பொருளின் பெயர் *",
          gridArea: "prn",
          // productOptions: [
          //   {
          //     label: "Rice-seeds (அரிசி விதைகள்)",
          //     image: riceSeeds,
          //   },
          //   {
          //     label: "Groundnuts (நிலக்கடலை)",
          //     image: groundnuts,
          //   },
          // ],
          productOptions: Products,
        }}
      />
      <Input
        name="variant"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "வகை *",
          gridArea: "var",
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
            ["A", "A"],
            ["B+", "B+"],
            ["B", "B"],
            ["C+", "C+"],
            ["C", "C"],
          ],
        }}
      />
    </S.StaticBox>
  );
};

export default FormField;

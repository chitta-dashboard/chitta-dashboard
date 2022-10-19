import { FC } from "react";
import { Control } from "react-hook-form";
import Input from "../../../input-fields/input/input";
import S from "./farmersGroupModal.styled";

interface CustomProps {
  control?: Control;
}

const FormField: FC<CustomProps> = ({ control }) => {
  return (
    <S.StaticBox>
      <Input
        name="groupName"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "குழு பெயர் *",
          gridArea: "gpn",
        }}
      />
      <Input
        name="explanation"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "விளக்கம் *",
          gridArea: "exn",
          fullHeight: true,
        }}
      />
      <Input
        name="chairman"
        type="autocomplete"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "தலைவர் *",
          selectoptions: ["option-1", "option-2", "option-3"],
          gridArea: "chn",
        }}
      />
      <Input
        name="treasurer"
        type="autocomplete"
        control={control}
        rules={{ required: "required" }}
        options={{
          gridArea: "tsr",
          label: "பொருளாளர் *",
          selectoptions: ["option-1", "option-2", "option-3"],
        }}
      />
      <Input
        name="secretary"
        type="autocomplete"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "செயலாளர் *",
          selectoptions: ["option-1", "option-2", "option-3"],
          gridArea: "sty",
        }}
      />
    </S.StaticBox>
  );
};

export default FormField;

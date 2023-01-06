import { FC } from "react";
import { Control } from "react-hook-form";
import S from "./farmersGroupModal.styled";
import Input from "../../../input-fields/input/input";

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
          placeholder: "குழு பெயரை உள்ளிடுக",
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
          multiline: true,
          maxRows: 4,
          textarea: true,
          placeholder: "விளக்கங்களை உள்ளிடுக",
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
          placeholder: "--தலைவர்--",
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
          placeholder: "--பொருளாளர்--",
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
          placeholder: "--செயலாளர்--",
        }}
      />
    </S.StaticBox>
  );
};

export default FormField;

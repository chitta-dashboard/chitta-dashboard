import { FC } from "react";
import { Control } from "react-hook-form";
import Input from "../../../input-fields/input/input";
import S from "./page2Fields.styled";

interface CustomProps {
  control: Control;
}

const FormFieldPage2: FC<CustomProps> = ({ control }) => {
  return (
    <S.FieldsBox>
      <Input
        name="qualification"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{ label: "கல்வி *", gridArea: "edu", placeholder: "கல்வி தகுதி" }}
      />
      <Input
        name="village"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{ label: "கிராமம் *", gridArea: "vil", placeholder: "கிராம பெயரை உள்ளிடுக " }}
      />
      <Input
        name="postalNo"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{ label: "அஞ்சல் குறியீடு *", gridArea: "pst", placeholder: "அஞ்சல் குறியீட்டை  உள்ளிடுக" }}
      />
      <Input
        name="address"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "முகவரி *",
          gridArea: "adr",
          fullHeight: true,
          multiline: true,
          maxRows: 4,
          textarea: true,
          placeholder: "முகவரியை உள்ளிடுக",
        }}
      />
      <Input
        name="taluk"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{ label: "தாலுக்கா *", gridArea: "tlk", placeholder: "தாலுகாவை உள்ளிடுக" }}
      />
      <Input
        name="district"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{ label: "மாவட்டம் *", gridArea: "sta", placeholder: "மாவட்டத்தை உள்ளிடுக " }}
      />
      <Input
        name="landType"
        type="select"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "நில வகை *",
          gridArea: "lty",
          selectOptions: [
            ["WET LAND", "WET LAND"],
            ["RAINFED", "RAINFED"],
            ["DRY LAND", "DRY LAND"],
            ["WELL", "WELL"],
          ],
          placeholder: "--நில வகை--",
        }}
      />
      <Input
        name="waterType"
        type="select"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "நீர் வகை *",
          gridArea: "wty",
          selectOptions: [
            ["WELL", "WELL"],
            ["TRIP IRRIGATION", "TRIP IRRIGATION"],
            ["RAINFED", "RAINFED"],
            ["RAIN", "RAIN"],
            ["BOREWELL", "BOREWELL"],
            ["WET LAND", "WET LAND"],
          ],
          placeholder: "--நீர் வகை--",
        }}
      />
      <Input
        name="farmerType"
        type="select"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "விவசாயி வகை *",
          gridArea: "fty",
          selectOptions: [
            ["option-1", "option-1"],
            ["option-2", "option-2"],
          ],
          placeholder: "--விவசாயி வகை--",
        }}
      />
      {/* animals is optional */}
      <Input
        name="animals"
        type="text"
        control={control}
        options={{
          label: "விலங்குகள்",
          gridArea: "ani",
          placeholder: "விலங்குகள் வகையை உள்ளிடுக ",
        }}
      />
      <Input
        name="groupMember"
        type="select"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "குழு உறுப்பினர் *",
          gridArea: "gmb",
          selectOptions: [
            ["yes", "ஆம்"],
            ["no", "இல்லை"],
          ],
          placeholder: "குழு உறுப்பினராக உள்ளீர்களா ?",
        }}
      />
    </S.FieldsBox>
  );
};

export default FormFieldPage2;

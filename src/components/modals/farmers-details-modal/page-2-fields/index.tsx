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
      <Input name="education" type="text" control={control} rules={{ required: "required" }} options={{ label: "கல்வி", gridArea: "edu" }} />
      <Input name="village" type="text" control={control} rules={{ required: "required" }} options={{ label: "கிராமம்", gridArea: "vil" }} />
      <Input name="postalNo" type="text" control={control} rules={{ required: "required" }} options={{ label: "அஞ்சல் குறியீடு", gridArea: "pst" }} />
      <Input
        name="address"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{ label: "முகவரி", gridArea: "adr", fullHeight: true }}
      />
      <Input name="taluk" type="text" control={control} rules={{ required: "required" }} options={{ label: "தாலுக்கா", gridArea: "tlk" }} />
      <Input name="district" type="text" control={control} rules={{ required: "required" }} options={{ label: "மாவட்டம்", gridArea: "sta" }} />
      <Input
        name="landType"
        type="select"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "நில வகை",
          gridArea: "lty",
          selectOptions: [
            ["option-1", "option-1"],
            ["option-2", "option-2"],
          ],
        }}
      />
      <Input
        name="waterType"
        type="select"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "நீர் வகை",
          gridArea: "wty",
          selectOptions: [
            ["option-1", "option-1"],
            ["option-2", "option-2"],
          ],
        }}
      />
      <Input
        name="farmerType"
        type="select"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "விவசாயி வகை",
          gridArea: "fty",
          selectOptions: [
            ["option-1", "option-1"],
            ["option-2", "option-2"],
          ],
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
        }}
      />
      <Input
        name="groupMember"
        type="select"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "குழு உறுப்பினர்",
          gridArea: "gmb",
          selectOptions: [
            ["yes", "ஆம்"],
            ["no", "இல்லை"],
          ],
        }}
      />
    </S.FieldsBox>
  );
};

export default FormFieldPage2;

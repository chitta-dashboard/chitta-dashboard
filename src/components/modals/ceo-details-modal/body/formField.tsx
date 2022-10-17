import { FC } from "react";
import { Control, UseFormSetValue, UseFormGetValues, UseFormUnregister } from "react-hook-form";
import { fileValidation } from "../../../../utils/constants";
import AddProfile from "../../../input-fields/add-profile";
import Input from "../../../input-fields/input/input";
import { IAddCEODetailsFormInput } from "../../type/formInputs";
import S from "./ceoDetailsModal.styled";

interface CustomProps {
  control: Control;
  setValue: UseFormSetValue<IAddCEODetailsFormInput>;
  getValues: UseFormGetValues<IAddCEODetailsFormInput>;
  unregister: UseFormUnregister<IAddCEODetailsFormInput>;
}

const FormField: FC<CustomProps> = ({ control, setValue, getValues, unregister }) => {
  return (
    <S.StaticBox>
      <AddProfile<IAddCEODetailsFormInput>
        inputName="profile"
        control={control}
        rules={{
          required: "required",
          validate: {
            fileFormat: (file: File) => {
              if (typeof file === "string" && (file as string).length > 0) return true; // passes cropped image url
              return fileValidation(file ? file?.name : "") || "expected format: .jpg, .jpeg, .png";
            },
          },
        }}
        setValue={setValue}
        getValues={getValues}
        unregister={unregister}
        gridArea="prf"
      />

      <Input name="name" type="text" control={control} rules={{ required: "required" }} options={{ label: "பெயர் *", gridArea: "nme" }} />

      <Input name="dob" type="date" control={control} rules={{ required: "required" }} options={{ label: "பிறந்த தேதி *", gridArea: "dob" }} />

      <Input
        name="phoneNumber"
        type="number"
        control={control}
        rules={{
          required: "required",
          minLength: { value: 10, message: "10 digits expected" },
          maxLength: { value: 10, message: "10 digits expected" },
        }}
        options={{ label: "கைபேசி எண் *", gridArea: "phn" }}
      />
      <Input name="qualification" type="text" control={control} rules={{ required: "required" }} options={{ label: "தகுதி *", gridArea: "qfn" }} />

      <Input
        name="description"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{ label: "சுயவிவரம் *", gridArea: "dsc", fullHeight: true, multiline: true, maxRows: 3 }}
      />
    </S.StaticBox>
  );
};

export default FormField;

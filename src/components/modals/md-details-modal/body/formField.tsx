import { FC } from "react";
import { UseFormSetValue, UseFormGetValues, UseFormUnregister, Control } from "react-hook-form";
import S from "./mdDetailsModal.styled";
import { fileValidation } from "../../../../utils/constants";
import AddProfile from "../../../input-fields/add-profile";
import Input from "../../../input-fields/input/input";
import { IAddMDDetailsFormInput } from "../../type/formInputs";

interface CustomProps {
  setValue: UseFormSetValue<IAddMDDetailsFormInput>;
  getValues: UseFormGetValues<IAddMDDetailsFormInput>;
  unregister: UseFormUnregister<IAddMDDetailsFormInput>;
  control: Control;
}

const FormField: FC<CustomProps> = ({ setValue, getValues, unregister, control }) => {
  return (
    <S.StaticBox>
      <AddProfile<IAddMDDetailsFormInput>
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
      <Input
        name="name"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{ label: "பெயர் *", gridArea: "nme", placeholder: "பெயரை உள்ளிடுக " }}
      />
      <Input
        name="phoneNumber"
        type="number"
        control={control}
        rules={{
          required: "required",
          minLength: { value: 10, message: "10 digits expected" },
          maxLength: { value: 10, message: "10 digits expected" },
        }}
        options={{ label: "கைபேசி எண் *", gridArea: "phn", placeholder: "கைபேசி எண்ணை உள்ளிடுக" }}
      />
      <Input
        name="dob"
        type="date"
        control={control}
        rules={{ required: "required" }}
        options={{ label: "பிறந்த தேதி *", gridArea: "dob", placeholder: "பிறந்த தேதியை உள்ளிடுக" }}
      />
      <Input
        name="qualification"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{ label: "தகுதி *", gridArea: "qfn", placeholder: "தகுதியை உள்ளிடுக" }}
      />
      <Input
        name="signature"
        type="file"
        control={control}
        rules={{
          required: "required",
          validate: {
            fileFormat: (file: File) => {
              if (typeof file === "string" && (file as string).length > 0) return true;
              return fileValidation(file ? file?.name : "") || "expected format: .jpg, .jpeg, .png";
            },
          },
        }}
        options={{ label: "கையெழுத்து *", gridArea: "sgn", placeholder: "கையெழுத்தை உள்ளிடுக" }}
      />
    </S.StaticBox>
  );
};

export default FormField;

import { FC } from "react";
import { UseFormSetValue, UseFormGetValues, UseFormUnregister, Control } from "react-hook-form";
import { fileValidation } from "../../../../utils/constants";
import Input from "../../../input-fields/input/input";
import AddProfile from "../../../input-fields/add-profile";
import { IAddMDDetailsFormInput } from "../../type/formInputs";
import S from "./mdDetailsModal.styled";

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
      <Input name="name" type="text" control={control} rules={{ required: "required" }} options={{ label: "பெயர் *", gridArea: "nme" }} />
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
      <Input name="dob" type="date" control={control} rules={{ required: "required" }} options={{ label: "பிறந்த தேதி *", gridArea: "dob" }} />
      <Input name="qualification" type="text" control={control} rules={{ required: "required" }} options={{ label: "தகுதி *", gridArea: "qfn" }} />
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
        options={{ label: "கையெழுத்து *", gridArea: "sgn" }}
      />
    </S.StaticBox>
  );
};

export default FormField;

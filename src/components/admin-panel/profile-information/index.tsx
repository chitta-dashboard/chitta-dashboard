import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { FieldErrorsImpl } from "react-hook-form";
import { adminFormInputs } from "../../../views/admin-panel";
import S from "./profileInformation.styled";

interface CustomProps {
  register: UseFormRegister<adminFormInputs>;
  errors: FieldErrorsImpl<{
    name: string;
    address: string;
    coordinatorAddress: string;
  }>;
}

const ProfileInformation: FC<CustomProps> = ({ register, errors }) => {
  return (
    <S.ProfileStack>
      <S.ProfileText>Profile information</S.ProfileText>
      <S.profileInput
        label="Name"
        type="text"
        InputLabelProps={{ shrink: true }}
        {...register("name")}
        helperText={errors.name && errors.name.message}
      />
      <S.profileInput
        label="Address"
        multiline
        rows={3}
        InputLabelProps={{ shrink: true }}
        {...register("address")}
        helperText={errors.address && errors.address.message}
      />
      <S.profileInput
        label="Coordinator Address"
        multiline
        rows={3}
        InputLabelProps={{ shrink: true }}
        {...register("coordinatorAddress")}
        helperText={errors.coordinatorAddress && errors.coordinatorAddress.message}
      />
    </S.ProfileStack>
  );
};

export default ProfileInformation;

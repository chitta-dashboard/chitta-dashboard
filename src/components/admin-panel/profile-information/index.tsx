import { FC } from "react";
import { UseFormRegister, FieldErrorsImpl } from "react-hook-form";
import { AdminFormInputs } from "../../../views/admin-panel";
import S from "./profileInformation.styled";

interface CustomProps {
  register: UseFormRegister<AdminFormInputs>;
  errors: FieldErrorsImpl<{
    name: string;
    address: string;
    coordinatorAddress: string;
  }>;
}

const ProfileInformation: FC<CustomProps> = (props) => {
  //constants
  const { register, errors } = props;
  
  return (
    <S.ProfileStack>
      <S.ProfileText>Profile information</S.ProfileText>
      <S.profileInput
        label="பெயர்"
        type="text"
        placeholder="பெயரை உள்ளிடுக"
        InputLabelProps={{ shrink: true }}
        {...register("name")}
        helperText={errors.name && errors.name.message}
      />
      <S.profileInput
        label="முகவரி"
        placeholder="முகவரியை உள்ளிடுக"
        multiline
        rows={3}
        InputLabelProps={{ shrink: true }}
        {...register("address")}
        helperText={errors.address && errors.address.message}
      />
      <S.profileInput
        label="ஒருங்கிணைப்பாளர் முகவரி"
        placeholder="ஒருங்கிணைப்பாளர் முகவரியை உள்ளிடுக"
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

import { FC } from "react";
import { UseFormRegister, FieldErrorsImpl } from "react-hook-form";
import { AdminFormInputs } from "../../../views/admin-panel";
import S from "./idInformation.styled";

interface CustomProps {
  register: UseFormRegister<AdminFormInputs>;
  errors: FieldErrorsImpl<{
    regNo: string;
    cinNo: string;
    membershipPrefix: string;
    folioPrefix: string;
  }>;
}

const IdInformation: FC<CustomProps> = ({ register, errors }) => {
  return (
    <S.ContainerStack>
      <S.IdText>Identification Information</S.IdText>
      <S.InputStack>
        <S.IdInput
          label="Reg No"
          type="number"
          placeholder="பதிவு எண்ணை உள்ளிடுக"
          InputLabelProps={{ shrink: true }}
          {...register("regNo")}
          helperText={errors.regNo && errors.regNo.message}
        />
        <S.IdInput
          label="CIN No"
          type="text"
          placeholder="நிறுவன அடையாள எண்ணை உள்ளிடுக"
          InputLabelProps={{ shrink: true }}
          {...register("cinNo")}
          helperText={errors.cinNo && errors.cinNo.message}
        />
      </S.InputStack>
      <S.InputStack>
        <S.IdInput
          label="Membership prefix"
          type="text"
          placeholder="உறுப்பினர் முன்னொட்டை உள்ளிடுக"
          InputLabelProps={{ shrink: true }}
          {...register("membershipPrefix")}
          helperText={errors.membershipPrefix && errors.membershipPrefix.message}
        />
        <S.IdInput
          label="Folio Prefix"
          type="text"
          placeholder="நிரந்தர முன்னொட்டை உள்ளிடுக"
          InputLabelProps={{ shrink: true }}
          {...register("folioPrefix")}
          helperText={errors.folioPrefix && errors.folioPrefix.message}
        />
      </S.InputStack>
    </S.ContainerStack>
  );
};

export default IdInformation;

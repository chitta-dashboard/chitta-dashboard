import { FC } from "react";
import { Control } from "react-hook-form";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import Input from "../../../input-fields/input/input";
import S from "./page3Fields.styled";

interface CustomProps {
  control: Control;
  accntNo: string;
}

const FormFieldPage3: FC<CustomProps> = ({ control, accntNo }) => {
  const { farmerBankDetail } = useFarmerDetailsContext();

  return (
    <S.FieldsBox>
      <Input
        name="nameAsPerBank"
        type="text"
        control={control}
        rules={{ required: farmerBankDetail && "required" }}
        options={{
          label: "பெயர்(வங்கி கணக்கில் இருப்பது போல் ) *",
          gridArea: "napb",
          placeholder: "பெயரை உள்ளிடுக",
          disabled: !farmerBankDetail,
        }}
      />
      <Input
        name="bankName"
        type="text"
        control={control}
        rules={{ required: farmerBankDetail && "required" }}
        options={{ label: "வங்கியின் பெயர் *", gridArea: "bn", placeholder: "வங்கியின் பெயரை உள்ளிடுக ", disabled: !farmerBankDetail }}
      />
      <Input
        name="accountNumber"
        type="number"
        control={control}
        rules={{ required: farmerBankDetail && "required" }}
        options={{
          label: "வங்கி கணக்கு எண் *",
          gridArea: "anum",
          placeholder: "வங்கி கணக்கு எண்ணை உள்ளிடுக",
          disabled: !farmerBankDetail,
        }}
      />
      <Input
        name="confirmAccountNumber"
        type="number"
        control={control}
        rules={{
          required: farmerBankDetail && "required",
          validate: (value) => (value !== accntNo && farmerBankDetail ? "Account number should match" : true),
        }}
        options={{
          label: "வங்கி கணக்கு எண்ணை உறுதி செய்க  *",
          gridArea: "cnanum",
          placeholder: "வங்கி கணக்கு எண்ணை உறுதி செய்க",
          disabled: !farmerBankDetail,
        }}
      />
      <Input
        name="ifscCode"
        type="text"
        control={control}
        rules={{ required: farmerBankDetail && "required" }}
        options={{ label: "IFSC குறியீடு *", gridArea: "code", placeholder: "IFSC குறியீட்டை  உள்ளிடுக", disabled: !farmerBankDetail }}
      />
    </S.FieldsBox>
  );
};

export default FormFieldPage3;

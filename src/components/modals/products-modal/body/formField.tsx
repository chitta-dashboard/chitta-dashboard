import { FC } from "react";
import { Control } from "react-hook-form";
import Input from "../../../input-fields/input/input";
import { PRODUCT_DATA, VARIANT_DATA } from "../../../../utils/constants";
import S from "./productsModal.styled";

interface CustomProps {
  control?: Control;
  variantList?: string[][] | null;
  availableList?: string[] | null;
  setProductName?: (name: string) => void;
  setProductId?: (name: string) => void;
  productImage?: string;
  disableOnEdit?: number;
  tab?: string;
}

const FormField: FC<CustomProps> = ({ control, variantList, availableList, setProductName, setProductId, productImage, disableOnEdit, tab }) => {
  //constants
  let temp: any = [];
  Object.values(VARIANT_DATA).forEach((i) => (temp = [...temp, Object.entries(i)]));
  const tempVariantsList = temp.flat(1);

  return (
    <S.StaticBox>
      <Input
        name="foodType"
        type="select"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "உணவு வகை *",
          gridArea: "ftp",
          selectOptions: [
            ["Raw", "Raw"],
            ["Processed", "Processed"],
            ["Animal", "Animal"],
          ],
          initialvalue: tab,
          disable: disableOnEdit,
        }}
      />
      <Input
        name="productName"
        type="autocomplete-with-imagelist"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "பொருளின் பெயர் *",
          gridArea: "prn",
          selectoptions: PRODUCT_DATA.raw,
          setproductname: setProductName,
          setproductid: setProductId,
          productimage: productImage,
          disable: disableOnEdit,
          placeholder: "பொருளின் பெயரை உள்ளிடுக",
        }}
      />
      <Input
        name="variantId"
        type="select"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "வகை *",
          gridArea: "var",
          selectOptions: disableOnEdit && variantList === null ? tempVariantsList : variantList,
          availablelist: availableList,
          disable: disableOnEdit,
          placeholder: "வகையை தேர்ந்தெடுக்க ",
        }}
      />
      <Input
        name="startDate"
        type="date"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "தொடக்க தேதி *",
          gridArea: "std",
        }}
      />
      <Input
        name="endDate"
        type="date"
        control={control}
        rules={{ required: "required" }}
        options={{
          gridArea: "end",
          label: "கடைசி தேதி *",
        }}
      />
      <Input
        name="availableAmount"
        type="number"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "கையிருப்பு தொகை *",
          gridArea: "ava",
          unit: "kg",
          placeholder: "கையிருப்பை உள்ளிடுக",
        }}
      />
      <Input
        name="qualityGrade"
        type="select"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "தரம் *",
          gridArea: "qty",
          selectOptions: [
            ["A+", "A+"],
            ["B+", "B+"],
            ["C+", "C+"],
          ],
          placeholder: "தரத்தை தேர்ந்தெடுக்க",
        }}
      />
      <Input
        name="productDescription"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "விளக்கம் *",
          gridArea: "des",
          fullHeight: true,
          textarea: true,
          multiline: true,
          maxRows: 4,
          placeholder: "விளக்கங்களை உள்ளிடுக",
        }}
      />
    </S.StaticBox>
  );
};

export default FormField;

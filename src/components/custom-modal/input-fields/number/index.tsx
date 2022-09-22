import LabelProps from "../../../modals/type/labelProps";
import S from "./number.styled";

const NumberInput = (props: LabelProps) => {
  return (
    <>
      <S.InputNumber variant="outlined" size="small" label={props.label} type="tel" InputProps={{}} />
    </>
  );
};

export default NumberInput;

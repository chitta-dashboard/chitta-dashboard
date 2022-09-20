import LabelProps from "../../../modals/type/labelProps";
import S from "./date.styled";

const DateInput = (props: LabelProps) => {
  return (
    <>
      <S.ChooseDate variant="outlined" label={props.label} />
    </>
  );
};

export default DateInput;

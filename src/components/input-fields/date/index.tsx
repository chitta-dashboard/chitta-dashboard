import Props from "../../modals/type/modalProps";
import S from "./date.styled";

const DateInput = (props: Props) => {
  return (
    <>
      <S.ChooseDate variant="outlined" label={props.label} />
    </>
  );
};

export default DateInput;

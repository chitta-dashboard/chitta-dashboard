import Props from "../../modals/type/modalProps";

import S from "./number.styled";

const NumberInput = (props: Props) => {
  return (
    <>
      <S.InputNumber label={props.label} {...props.register} helperText={props.helperText} />
    </>
  );
};

export default NumberInput;

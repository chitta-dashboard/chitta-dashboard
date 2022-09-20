import Props from "../../modals/type/modalProps";

import S from "./text.styled";

const TextInput = (props: Props) => {
  return (
    <>
      <S.InputText label={props.label} />
    </>
  );
};

export default TextInput;

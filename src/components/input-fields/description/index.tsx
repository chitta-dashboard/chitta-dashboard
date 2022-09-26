import Props from "../../modals/type/modalProps";

import S from "./description.styled";

const DescriptionField = (props: Props) => {
  return (
    <>
      <S.Description label={props.label} multiline maxRows={3} {...props.register} helperText={props.helperText} />
    </>
  );
};

export default DescriptionField;

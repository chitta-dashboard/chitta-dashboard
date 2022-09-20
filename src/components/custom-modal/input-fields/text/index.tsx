import LabelProps from "../../../modals/type/labelProps";
import S from "./text.styled";

const TextInput = (props: LabelProps) => {
  return (
    <>
      <S.InputText
        variant="outlined"
        size="small"
        label={props.label}
        InputProps={{ style: { fontSize: ".8rem" } }}
        InputLabelProps={{ style: { fontSize: ".8rem" } }}
      />
    </>
  );
};

export default TextInput;

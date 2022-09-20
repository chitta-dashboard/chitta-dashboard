import Props from "../../modals/type/modalProps";

import S from "./file.styled";

const FileInput = (props: Props) => {
  return (
    <>
      <S.ChooseFile
        variant="outlined"
        label={props.label}
        type="file"
        InputProps={{ style: { fontSize: ".8rem" } }}
        InputLabelProps={{ style: { fontSize: ".8rem" } }}
      />
    </>
  );
};

export default FileInput;

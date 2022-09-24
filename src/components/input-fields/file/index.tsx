import Props from "../../modals/type/modalProps";

import S from "./file.styled";

const FileInput = (props: Props) => {
  return (
    <>
      <S.ChooseFile variant="outlined" label={props.label} type="file" {...props.register} helperText={props.helperText} />
    </>
  );
};

export default FileInput;

import { TextField } from "@mui/material";

import LabelProps from "../../../modals/type/labelProps";

const DescriptionField = (props: LabelProps) => {
  return (
    <>
      <TextField id="outlined-multiline-flexible" label={props.label} multiline maxRows={4} value={""} />
    </>
  );
};

export default DescriptionField;

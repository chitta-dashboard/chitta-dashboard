import { DialogTitle, Box } from "@mui/material";

import Submit from "../../buttons/submit-button";
import CustomModal from "../../custom-modal";
import TitleCloseButton from "../../buttons/title-close-button";
import Props from "../type/modalProps";
import FormField from "./body/formField";

const AddDecisionsModal = (props: Props) => {
  return (
    <>
      <CustomModal openModal={props.openModal} handleClose={props.handleClose}>
        <DialogTitle>
          <Box>Add Decisions</Box>
          <TitleCloseButton openModal={props.openModal} handleClose={props.handleClose} />
        </DialogTitle>
        <FormField openModal={props.openModal} />
        <Submit openModal={props.openModal} handleClose={props.handleClose} />
      </CustomModal>
    </>
  );
};
export default AddDecisionsModal;

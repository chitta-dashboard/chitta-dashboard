import { DialogTitle, Box } from "@mui/material";

import YesOrNo from "../../buttons/yes-or-no-buttons";
import CustomModal from "../../custom-modal";
import Props from "../type/modalProps";
import ConfirmationBody from "./body";

const ConfirmationModal = (props: Props) => {
  return (
    <>
      <CustomModal label={""} openModal={props.openModal} handleClose={props.handleClose}>
        <DialogTitle>
          <Box>Confirmation</Box>
        </DialogTitle>
        <ConfirmationBody label={""} openModal={props.openModal} handleClose={props.handleClose} />
        <YesOrNo label={""} openModal={props.openModal} handleClose={props.handleClose} />
      </CustomModal>
    </>
  );
};
export default ConfirmationModal;

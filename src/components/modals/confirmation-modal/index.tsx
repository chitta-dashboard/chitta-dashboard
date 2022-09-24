import { DialogTitle, Box } from "@mui/material";

import YesOrNoButtons from "../../buttons/yes-or-no-buttons";
import CustomModal from "../../custom-modal";
import Props from "../type/modalProps";
import ConfirmationBody from "./body";

const ConfirmationModal = (props: Props) => {
  return (
    <>
      <CustomModal openModal={props.openModal} handleClose={props.handleClose}>
        <DialogTitle>
          <Box>Confirmation</Box>
        </DialogTitle>
        <ConfirmationBody openModal={props.openModal} handleClose={props.handleClose} />
        <YesOrNoButtons openModal={props.openModal} handleClose={props.handleClose} />
      </CustomModal>
    </>
  );
};
export default ConfirmationModal;

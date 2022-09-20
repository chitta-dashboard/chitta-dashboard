import { DialogTitle, Box } from "@mui/material";

import CustomModal from "../../custom-modal";
import Props from "../type/modalProps";
import YesOrNo from "../../custom-modal/buttons/yes-or-no-buttons";
import DeleteBody from "./body";

const DeleteModal = (props: Props) => {
  return (
    <>
      <CustomModal label={""} openModal={props.openModal} handleClose={props.handleClose}>
        <DialogTitle>
          <Box>Warning</Box>
        </DialogTitle>
        <DeleteBody label={""} openModal={props.openModal} handleClose={props.handleClose} />
        <YesOrNo label={""} openModal={props.openModal} handleClose={props.handleClose} />
      </CustomModal>
    </>
  );
};

export default DeleteModal;

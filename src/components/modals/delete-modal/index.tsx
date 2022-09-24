import { DialogTitle, Box } from "@mui/material";

import CustomModal from "../../custom-modal";
import Props from "../type/modalProps";
import YesOrNoButtons from "../../buttons/yes-or-no-buttons";
import DeleteBody from "./body";

const DeleteModal = (props: Props) => {
  return (
    <>
      <CustomModal label={""} openModal={props.openModal} handleClose={props.handleClose}>
        <DialogTitle>
          <Box>Warning</Box>
        </DialogTitle>
        <DeleteBody label={""} openModal={props.openModal} handleClose={props.handleClose} />
        <YesOrNoButtons label={""} openModal={props.openModal} handleClose={props.handleClose} />
      </CustomModal>
    </>
  );
};

export default DeleteModal;

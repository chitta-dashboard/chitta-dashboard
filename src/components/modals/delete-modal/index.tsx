import { FC } from "react";
import { DialogTitle, Box } from "@mui/material";

import CustomModal from "../../custom-modal";
import YesOrNo from "../../buttons/yes-or-no-buttons";
import DeleteBody from "./body";

interface deleteProps {
  openModal: boolean;
  handleClose: any;
  deleteId?: number;
  // deleteMdDetails?: (id: number) => void;
  deleteFarmersGroup?: (id: number) => void;
  deleteFarmersDetails?: (id: number) => void;
}

const DeleteModal: FC<deleteProps> = (props) => {
  console.log("delete props", props);
  return (
    <>
      <CustomModal label={""} openModal={props.openModal} handleClose={props.handleClose}>
        <DialogTitle>
          <Box>Warning</Box>
        </DialogTitle>
        <DeleteBody label={""} openModal={props.openModal} handleClose={props.handleClose} />
        <YesOrNo
          openModal={props.openModal}
          handleClose={props.handleClose}
          // deleteMdDetails={props.deleteMdDetails}
          deleteFarmersGroup={props.deleteFarmersGroup}
          deleteFarmersDetails={props.deleteFarmersDetails}
          deleteId={props.deleteId}
        />
      </CustomModal>
    </>
  );
};

export default DeleteModal;

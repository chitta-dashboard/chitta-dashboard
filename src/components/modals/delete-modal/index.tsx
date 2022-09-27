import { DialogTitle, Box } from "@mui/material";

import CustomModal from "../../custom-modal";
import YesOrNoButtons from "../../buttons/yes-or-no-buttons";
import DeleteBody from "./body";
import { FC } from "react";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const DeleteModal: FC<CustomProps> = ({ openModal, handleClose, handleDelete }) => {
  return (
    <>
      <CustomModal openModal={openModal} handleClose={handleClose}>
        <DialogTitle>
          <Box>Warning</Box>
        </DialogTitle>
        <DeleteBody />
        <YesOrNoButtons yesAction={handleDelete} handleClose={handleClose} />
      </CustomModal>
    </>
  );
};

export default DeleteModal;

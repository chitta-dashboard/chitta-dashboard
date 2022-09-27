import { DialogTitle, Box } from "@mui/material";
import { FC } from "react";

import YesOrNoButtons from "../../buttons/yes-or-no-buttons";
import CustomModal from "../../custom-modal";
import ConfirmationBody from "./body";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  yesAction: () => void;
}
const ConfirmationModal: FC<CustomProps> = ({ openModal, handleClose, yesAction }) => {
  return (
    <>
      <CustomModal openModal={openModal} handleClose={handleClose}>
        <DialogTitle>
          <Box>Confirmation</Box>
        </DialogTitle>
        <ConfirmationBody />
        <YesOrNoButtons yesAction={yesAction} handleClose={handleClose} />
      </CustomModal>
    </>
  );
};
export default ConfirmationModal;

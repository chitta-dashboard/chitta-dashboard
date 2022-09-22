import { DialogTitle, Box } from "@mui/material";

import Submit from "../../buttons/submit-button";
import CustomModal from "../../custom-modal";
import TitleCloseButton from "../../buttons/title-close-button";
import Props from "../type/modalProps";
import FormField from "./body/formField";

const AddFarmersGroupModal = (props: Props) => {
  return (
    <>
      <CustomModal label={""} openModal={props.openModal} handleClose={props.handleClose}>
        <DialogTitle>
          <Box>Add Farmer's Group</Box>
          <TitleCloseButton label={""} openModal={props.openModal} handleClose={props.handleClose} />
        </DialogTitle>
        <FormField openModal={props.openModal} />
        <Submit label={""} openModal={props.openModal} handleClose={props.handleClose} />
      </CustomModal>
    </>
  );
};
export default AddFarmersGroupModal;

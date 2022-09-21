import { DialogTitle, Box } from "@mui/material";

import AddProfile from "../../custom-modal/add-profile-icon-and-button";
import Props from "../type/modalProps";
import FormField from "./body/formField";
import CustomModal from "../../custom-modal";
import Submit from "../../custom-modal/buttons/submit-button";
import TitleCloseButton from "../../custom-modal/buttons/title-close-button";
import Chips from "../../custom-modal/input-fields/chips";
const AddMdDetailsModal = (props: Props) => {
  return (
    <>
      <CustomModal label={""} openModal={props.openModal} handleClose={props.handleClose}>
        <DialogTitle>
          <Box>Add MD Details</Box>
          <TitleCloseButton label={""} openModal={props.openModal} handleClose={props.handleClose} />
        </DialogTitle>
        <AddProfile />
        <FormField />
        <Chips label={""} openModal={props.openModal} handleClose={props.handleClose} />
        <Submit label={""} openModal={props.openModal} handleClose={props.handleClose} />
      </CustomModal>
    </>
  );
};

export default AddMdDetailsModal;

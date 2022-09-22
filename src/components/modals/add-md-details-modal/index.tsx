import { DialogTitle, Box } from "@mui/material";

import AddProfile from "../../buttons/add-profile-icon-and-button";
import Props from "../type/modalProps";
import FormField from "./body/formField";
import CustomModal from "../../custom-modal";
import Submit from "../../buttons/submit-button";
import TitleCloseButton from "../../buttons/title-close-button";
import Chips from "../../input-fields/chips";
const AddMdDetailsModal = (props: Props) => {
  return (
    <>
      <CustomModal label={""} openModal={props.openModal} handleClose={props.handleClose}>
        <DialogTitle>
          <Box>Add MD Details</Box>
          <TitleCloseButton label={""} openModal={props.openModal} handleClose={props.handleClose} />
        </DialogTitle>
        <AddProfile openModal={props.openModal} />
        <FormField openModal={props.openModal} />
        <Chips label={""} openModal={props.openModal} handleClose={props.handleClose} />
        <Submit label={""} openModal={props.openModal} handleClose={props.handleClose} />
      </CustomModal>
    </>
  );
};

export default AddMdDetailsModal;

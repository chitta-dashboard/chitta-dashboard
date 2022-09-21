import { Box, DialogTitle } from "@mui/material";

import BackAndSubmit from "../../../custom-modal/buttons/back-and-submit-buttons";
import CustomModal from "../../../custom-modal";
import TitleCloseButton from "../../../custom-modal/buttons/title-close-button";
import Props from "../../type/modalProps";
import FormField from "./body/formField";
import PageNumber2 from "./body/pageNumber";

const AddFarmersDetailsModalPage2 = (props: Props) => {
  return (
    <>
      <CustomModal label={""} openModal={props.openModal} handleClose={props.handleClose}>
        <DialogTitle>
          <Box>Add Farmer's Details</Box>
          <TitleCloseButton label={""} openModal={props.openModal} handleClose={props.handleClose} />
        </DialogTitle>
        <FormField />
        <PageNumber2 />
        <BackAndSubmit label={""} openModal={props.openModal} handleClose={props.handleClose} />
      </CustomModal>
    </>
  );
};

export default AddFarmersDetailsModalPage2;

import { useState } from "react";
import { DialogTitle, Box } from "@mui/material";

import AddProfile from "../../../custom-modal/add-profile-icon-and-button";
import Next from "../../../custom-modal/buttons/next-button";
import Props from "../../type/modalProps";
import FormField from "./body/formField";
import PageNumber1 from "./body/pageNumber";
import AddFarmersDetailsModalPage2 from "../page-2-modal";
import CustomModal from "../../../custom-modal";
import TitleCloseButton from "../../../custom-modal/buttons/title-close-button";

const AddFarmersDetailsModalPage1 = (props: Props) => {
  const [next, setNext] = useState(false);

  const nextPage = () => {
    setNext(!next);
  };

  return (
    <>
      <CustomModal label={""} openModal={props.openModal} handleClose={props.handleClose}>
        <DialogTitle>
          <Box>Add Farmer's Details</Box>
          <TitleCloseButton label={""} openModal={props.openModal} handleClose={props.handleClose} />
        </DialogTitle>
        <AddProfile />
        <FormField />
        <PageNumber1 />
        <Next label={""} openModal={next} handleClose={nextPage} />
      </CustomModal>
      <AddFarmersDetailsModalPage2 label={""} openModal={next} handleClose={nextPage} />
    </>
  );
};

export default AddFarmersDetailsModalPage1;

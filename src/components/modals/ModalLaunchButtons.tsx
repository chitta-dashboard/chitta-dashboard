import React, { Fragment } from "react";
import { Button } from "@mui/material";

import DeleteModal from "./delete-modal";
import ConfirmationModal from "./confirmation-modal";
import AddFarmersGroupModal from "./add-farmers-group-modal";
import AddFarmersDetailsModalPage1 from "./add-farmers-details-modal/page-1-modal";
import AddMdDetailsModal from "./add-md-details-modal";
import AddDecisionsModal from "./add-decisions-modal";

const ModalLaunchButtons = () => {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [openAddMd, setOpenAddMd] = React.useState(false);
  const [openAddFarmerGroup, setOpenAddFarmerGroup] = React.useState(false);
  const [openAddFarmerDetails, setOpenAddFarmerDetails] = React.useState(false);
  const [openAddDecisions, setOpenAddDecisions] = React.useState(false);

  const deleteHandleClickOpen = () => {
    setOpenDelete(!openDelete);
  };

  const submitHandleClickOpen = () => {
    setOpenConfirmation(!openConfirmation);
  };
  const addMDOpen = () => {
    setOpenAddMd(!openAddMd);
  };
  const addFarmerGroup = () => {
    setOpenAddFarmerGroup(!openAddFarmerGroup);
  };
  const addFarmerDetails = () => {
    setOpenAddFarmerDetails(!openAddFarmerDetails);
  };
  const addDecisions = () => {
    setOpenAddDecisions(!openAddDecisions);
  };

  return (
    <Fragment>
      <Button variant="outlined" onClick={deleteHandleClickOpen}>
        delete
      </Button>
      <Button variant="outlined" onClick={submitHandleClickOpen}>
        save
      </Button>
      <Button variant="outlined" onClick={addMDOpen}>
        add md details
      </Button>
      <Button variant="outlined" onClick={addFarmerGroup}>
        add farmer's group
      </Button>
      <Button variant="outlined" onClick={addFarmerDetails}>
        add farmer's details
      </Button>
      <Button variant="outlined" onClick={addDecisions}>
        add decicions
      </Button>
      <DeleteModal label={""} openModal={openDelete} handleClose={deleteHandleClickOpen} />
      <ConfirmationModal label={""} openModal={openConfirmation} handleClose={submitHandleClickOpen} />
      <AddMdDetailsModal label={""} openModal={openAddMd} handleClose={addMDOpen} />
      <AddFarmersGroupModal label={""} openModal={openAddFarmerGroup} handleClose={addFarmerGroup} />
      <AddFarmersDetailsModalPage1 label={""} openModal={openAddFarmerDetails} handleClose={addFarmerDetails} />
      <AddDecisionsModal label={""} openModal={openAddDecisions} handleClose={addDecisions} />
    </Fragment>
  );
};

export default ModalLaunchButtons;

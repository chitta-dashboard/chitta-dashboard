import React, { Fragment } from "react";
import { Button } from "@mui/material";

import DeleteModal from "./delete-modal";
import ConfirmationModal from "./confirmation-modal";
import AddFarmersGroupModal from "./add-farmers-group-modal";
import AddFarmersDetailsModal from "./add-farmers-details-modal";
import AddMdDetailsModal from "./add-md-details-modal";
import AddDecisionsModal from "./add-decisions-modal";
import { MdDetailsContextProvider } from "../../utils/context/md-details";
import { IAddDecisionsFormInput, IAddFarmersDetailsFormInput, IAddFarmersGroupFormInput, IAddMDDetailsFormInput } from "./type/formInputs";
import { FarmerDetailsContextProvider } from "../../utils/context/farmers-details";
import { FarmerGroupDetailsContextProvider } from "../../utils/context/farmers-group";

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
      <DeleteModal
        openModal={openDelete}
        handleClose={deleteHandleClickOpen}
        handleDelete={() => {
          // console.log("deleted");
        }}
      />
      <ConfirmationModal
        openModal={openConfirmation}
        handleClose={submitHandleClickOpen}
        yesAction={() => {
          // console.log("confirmed");
        }}
      />
      <MdDetailsContextProvider>
        <AddMdDetailsModal
          openModal={openAddMd}
          handleClose={addMDOpen}
          cb={(data: IAddMDDetailsFormInput): void => {
            // console.log("in mdDetails cb", data);
          }}
          editMode
          id={"3"}
        />
      </MdDetailsContextProvider>
      <FarmerDetailsContextProvider>
        <AddFarmersDetailsModal
          openModal={openAddFarmerDetails}
          handleClose={addFarmerDetails}
          cb={(data: IAddFarmersDetailsFormInput): void => {
            // console.log("in farmersDetails cb", data);
          }}
          editMode
          id={"3"}
        />
      </FarmerDetailsContextProvider>
      <FarmerGroupDetailsContextProvider>
        <AddFarmersGroupModal
          openModal={openAddFarmerGroup}
          cb={(data: IAddFarmersGroupFormInput): void => {
            // console.log("in farmersGroup cb", data);
          }}
          handleClose={addFarmerGroup}
          editMode
          id={"3"}
        />
      </FarmerGroupDetailsContextProvider>
      <AddDecisionsModal openModal={openAddDecisions} handleClose={addDecisions} cb={(data: IAddDecisionsFormInput): void => {}} />
    </Fragment>
  );
};

export default ModalLaunchButtons;

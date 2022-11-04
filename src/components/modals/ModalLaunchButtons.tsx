import React, { Fragment } from "react";
import { Button } from "@mui/material";
import DeleteModal from "./delete-modal";
import ConfirmationModal from "./confirmation-modal";
import FarmersGroupModal from "./farmers-group-modal";
import FarmersDetailsModal from "./farmers-details-modal";
import MdDetailsModal from "./md-details-modal";
import ResolutionModal from "./resolution-modal";
import { MdDetailsContextProvider } from "../../utils/context/mdDetails";
import { IAddFarmersDetailsFormInput, IAddFarmersGroupFormInput, IAddMDDetailsFormInput } from "./type/formInputs";
// import { FarmerDetailsContextProvider } from "../../utils/context/farmersDetails";
import { FarmersGroupContextProvider } from "../../utils/context/farmersGroup";
import { IResolution } from "../../utils/store/slice/resolution";

const ModalLaunchButtons = () => {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [openAddMd, setOpenAddMd] = React.useState(false);
  const [openAddFarmerGroup, setOpenAddFarmerGroup] = React.useState(false);
  const [openAddFarmerDetails, setOpenAddFarmerDetails] = React.useState(false);
  const [openAddResolution, setOpenAddResolution] = React.useState(false);
  const [openShareAmount, setOpenShareAmount] = React.useState(false);
  const [openLoader, setOpenLoader] = React.useState(false);

  const loaderModalHandler = () => {
    setOpenLoader(!openLoader);
  };
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

  const addResolution = () => {
    setOpenAddResolution(!openAddResolution);
  };

  const addShareAmount = () => {
    setOpenShareAmount(!openShareAmount);
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
      <Button variant="outlined" onClick={addResolution}>
        add decicions
      </Button>
      <Button variant="outlined" onClick={addShareAmount}>
        Share Amount
      </Button>
      <Button variant="outlined" onClick={loaderModalHandler}>
        Loader
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
        <MdDetailsModal
          openModal={openAddMd}
          handleClose={addMDOpen}
          cb={(data: IAddMDDetailsFormInput): void => {
            // console.log("in mdDetails cb", data);
          }}
          editMode
          id={"3"}
        />
      </MdDetailsContextProvider>
      <FarmersDetailsModal
        openModal={openAddFarmerDetails}
        handleClose={addFarmerDetails}
        cb={(data: IAddFarmersDetailsFormInput): void => {
          // console.log("in farmersDetails cb", data);
        }}
        editMode
        id={"3"}
      />
      <FarmersGroupContextProvider>
        <FarmersGroupModal
          openModal={openAddFarmerGroup}
          cb={(data: IAddFarmersGroupFormInput): void => {
            // console.log("in farmersGroup cb", data);
          }}
          handleClose={addFarmerGroup}
          editMode
          id={"3"}
        />
      </FarmersGroupContextProvider>
      <ResolutionModal openModal={openAddResolution} handleClose={addResolution} cb={(data: IResolution): void => {}} />
      {/* <ShareAmountModal openModal={openShareAmount} handleClose={addShareAmount} /> */}
    </Fragment>
  );
};

export default ModalLaunchButtons;

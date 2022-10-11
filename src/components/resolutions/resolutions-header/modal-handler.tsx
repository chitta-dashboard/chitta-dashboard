import React, { useState } from "react";
import AddDecisionsModal from "../../modals/decisions-modal";
import { IResolution, useResolutionsProviderContext } from "../../../utils/context/resolutions";
import ConfirmationModal from "../../modals/confirmation-modal";
import DeleteModal from "../../modals/delete-modal";

interface ModalHandlerProps {
  isOpen: boolean;
  handleClose: () => void;
}

const ModalHandler: React.FC<ModalHandlerProps> = ({ isOpen, handleClose }) => {
  const [confirmation, setConfirmation] = useState(false);
  const [deletion, setDeletion] = useState(false);
  const [submitData, setSubmitData] = useState<IResolution>();
  const { addResolution } = useResolutionsProviderContext();

  const addGroupData = (data: IResolution) => addResolution(data);

  return (
    <>
      <ConfirmationModal
        openModal={confirmation}
        handleClose={() => {
          setConfirmation(false);
          setSubmitData(undefined);
        }}
        yesAction={() => {
          addGroupData(submitData as IResolution);
          setConfirmation(false);
          handleClose();
        }}
      />
      <DeleteModal
        openModal={deletion}
        handleClose={() => setDeletion(false)}
        handleDelete={() => {
          handleClose();
          setDeletion(false);
        }}
      />
      {/* The below 'isOpen' logic is because of dynamic current time updation in modal */}
      {isOpen && (
        <AddDecisionsModal
          openModal={true}
          handleClose={() => {
            setDeletion(true);
          }}
          cb={(data) => {
            setSubmitData(data);
            setConfirmation(true);
          }}
        />
      )}
    </>
  );
};

export default ModalHandler;

import { FC } from "react";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import CustomModal from "../../custom-modal";
import FormField from "./body/formField";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import { IAddDecisionsFormInput } from "../type/formInputs";
import { IResolution } from "../../../utils/context/resolutions";
import { createTimeStamp, getCurrentTime } from "../../../utils/constants";

interface CustomProps {
  cb: (data: IResolution) => void;
  openModal: boolean;
  handleClose: () => void;
  editMode?: boolean;
  id?: string;
}

const DecisionsModal: FC<CustomProps> = ({ cb, openModal, handleClose, editMode = false, id = "" }) => {
  const { handleSubmit, setValue, trigger, control } = useForm<IAddDecisionsFormInput>({});

  const onSubmit: any = (data: IAddDecisionsFormInput) => {
    cb({
      id: editMode ? id : uuidv4(),
      groupName: data.groupName,
      groupTitle: data.decisionHeading,
      groupDescription: data.description,
      groupDescriptionRichText: data.descriptionRichText,
      // the date which the user selects as dob
      timestamp: createTimeStamp(data.creationTime),
      presenter: data.presenter,
      participator: data.participator,
      // the date&time when the resolution is actually added
      // when edited, the creationtime should change or not?, behaviour undecided?. currently the time changes also in edit.
      creationTime: getCurrentTime(),
    });
    !editMode && handleClose();
  };

  return (
    <>
      <CustomModal openModal={openModal} handleClose={handleClose} openAddDecisionModal={true}>
        <ModalHeader handleClose={handleClose}>Add Decisions</ModalHeader>

        <ModalBody id="addDecisions" onSubmit={handleSubmit(onSubmit)}>
          <FormField setValue={setValue} trigger={trigger} control={control} editMode={editMode} id={id} />
        </ModalBody>

        <ModalFooter>
          <Button form="addDecisions" type="submit">
            Submit
          </Button>
        </ModalFooter>
      </CustomModal>
    </>
  );
};
export default DecisionsModal;

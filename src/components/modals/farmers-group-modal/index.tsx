import { FC, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Control, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { ENDPOINTS } from "../../../utils/constants";
import { useFetch } from "../../../utils/hooks/query";
import { IAddFarmersGroupFormInput } from "../type/formInputs";
import CustomModal from "../../custom-modal";
import FormField from "./body/formField";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";

interface CustomProps {
  cb: (data: IAddFarmersGroupFormInput & { id: string; members: string[] }) => void;
  openModal: boolean;
  handleClose: () => void;
  editMode?: boolean;
  id?: string;
  members?: string[];
}

interface ISubmitData extends IAddFarmersGroupFormInput {
  id?: string;
  members?: string[];
}
type SubmitType = (data: ISubmitData) => void;

const FarmersGroupModal: FC<CustomProps> = (props) => {
  //constants
  const { openModal, handleClose, cb, editMode = false, id = "", members = [] } = props;

  const { handleSubmit, clearErrors, reset, control: formControl, watch } = useForm<IAddFarmersGroupFormInput>();
  const {
    result: { data: farmerGroupData },
    formatChangeSuccess: isFarmerGroupSuccess,
  } = useFetch(ENDPOINTS.farmerGroup);

  // for enabling the submit button
  const groupNameEvent = watch("groupName");
  const explanationEvent = watch("explanation");
  const chairmanEvent = watch("chairman");
  const treasurerEvent = watch("treasurer");
  const secretaryEvent = watch("secretary");
  let enableButton = true;
  const isBtnDisable = groupNameEvent && explanationEvent && chairmanEvent && treasurerEvent && secretaryEvent;
  if (isBtnDisable) enableButton = false;

  useEffect(() => {
    if (editMode) {
      let groupData = Object.values(isFarmerGroupSuccess && (farmerGroupData as CustomProps)).find((f) => String(f.id) === id);
      reset({
        groupName: groupData?.groupName as string,
        explanation: groupData?.explanation as string,
        chairman: groupData?.chairman as string,
        treasurer: groupData?.treasurer as string,
        secretary: groupData?.secretary as string,
      });
    }
    return () =>
      reset({
        groupName: "",
        explanation: "",
        chairman: "",
        treasurer: "",
        secretary: "",
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode, id]);

  //functions
  const onSubmit: SubmitType = (data) => {
    cb({ ...data, id: editMode ? id : uuidv4(), members: members });
    !editMode && reset();
    !editMode && handleClose();
  };

  return (
    <CustomModal
      openModal={openModal}
      handleClose={() => {
        clearErrors();
        reset();
        handleClose();
      }}
    >
      <ModalHeader
        handleClose={() => {
          clearErrors();
          reset();
          handleClose();
        }}
      >
        {editMode ? "Edit Farmer's Group" : "Add Farmer's Group"}
      </ModalHeader>

      <ModalBody id={"farmersGroup"} onSubmit={handleSubmit(onSubmit)}>
        <FormField control={formControl as unknown as Control} />
      </ModalBody>

      <ModalFooter>
        <Button form="farmersGroup" type="submit" disabled={enableButton}>
          Submit
        </Button>
      </ModalFooter>
    </CustomModal>
  );
};
export default FarmersGroupModal;

import { Control, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { FC, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { dateFormat } from "../../../utils/constants";
import { useCeoDetailsContext } from "../../../utils/context/ceoDetails";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import { IAddCEODetailsFormInput } from "../type/formInputs";
import FormField from "./body/formField";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  cb: (data: IAddCEODetailsFormInput & { id: string }) => void;
  editMode?: boolean;
  id?: string;
}

const CeoDetailsModal: FC<CustomProps> = ({ openModal, handleClose, cb, editMode = false, id = "" }) => {
  let { ceoDetailsById } = useCeoDetailsContext();
  const { handleSubmit, reset, clearErrors, unregister, setValue, getValues, watch, control: formControl } = useForm<IAddCEODetailsFormInput>({});

  // enabling submit button

  let enableButton = true;
  const nameEvent = watch("name");
  const phoneNumberEvent = watch("phoneNumber");
  const qualificationEvent = watch("qualification");
  const dobEvent = watch("dob");
  const descriptionEvent = watch("description");
  const profileEvent = watch("profile");

  if (nameEvent && phoneNumberEvent && qualificationEvent && dobEvent && descriptionEvent && profileEvent) {
    enableButton = false;
  }

  useEffect(() => {
    if (editMode) {
      let userData = Object.values(ceoDetailsById).find((ceo) => String(ceo.id) === id);
      reset({
        name: userData?.name as string,
        phoneNumber: userData?.phoneNumber as unknown as string,
        qualification: userData?.qualification as string,
        dob: dateFormat(userData?.dob) as string,
        description: userData?.description as string,
        profile: userData?.profile, // temporary, until sbucket integration
      });
    }

    return () =>
      reset({
        name: "",
        phoneNumber: "",
        qualification: "",
        dob: "",
        description: "",
        profile: "",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);
  // }, [editMode, id]);

  const onSubmit: any = (data: IAddCEODetailsFormInput & { id: string }) => {
    cb({
      description: data.description,
      dob: dateFormat(data.dob),
      name: data.name,
      phoneNumber: data.phoneNumber,
      profile: data.profile,
      qualification: data.qualification,
      id: editMode ? id : uuidv4(),
    } as IAddCEODetailsFormInput & { id: string });
    handleClose();
    reset();
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
        {editMode ? " Edit CEO Details" : " Add CEO Details "}
      </ModalHeader>
      <ModalBody id="ceoDetails" onSubmit={handleSubmit(onSubmit)}>
        <FormField control={formControl as unknown as Control} setValue={setValue} getValues={getValues} unregister={unregister} />
      </ModalBody>
      <ModalFooter>
        <Button form="ceoDetails" type="submit" disabled={enableButton}>
          Submit
        </Button>
      </ModalFooter>
    </CustomModal>
  );
};

export default CeoDetailsModal;

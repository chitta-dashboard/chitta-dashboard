import { Control, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { FC, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMdDetailsContext } from "../../../utils/context/mdDetails";
import { dateFormat, decryptText, encryptFile } from "../../../utils/constants";
import ModalHeader from "../../custom-modal/header";
import ModalFooter from "../../custom-modal/footer";
import ModalBody from "../../custom-modal/body";
import CustomModal from "../../custom-modal";
import { IAddMDDetailsFormInput } from "../type/formInputs";
import FormField from "./body/formField";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  cb: (data: IAddMDDetailsFormInput & { id: string }) => void;
  editMode?: boolean;
  id?: string;
}

const MdDetailsModal: FC<CustomProps> = ({ openModal, handleClose, cb, editMode = false, id = "" }) => {
  let { mdDetailsById } = useMdDetailsContext();

  const { handleSubmit, reset, clearErrors, setValue, getValues, unregister, control, watch } = useForm<IAddMDDetailsFormInput>();

  // enabling submit button

  let enableButton = true;
  const nameEvent = watch("name");
  const phoneNumberEvent = watch("phoneNumber");
  const qualificationEvent = watch("qualification");
  const dobEvent = watch("dob");
  const signatureEvent = watch("signature");
  const profileEvent = watch("profile");

  if (nameEvent && phoneNumberEvent && qualificationEvent && dobEvent && signatureEvent && profileEvent) {
    enableButton = false;
  }

  useEffect(() => {
    if (editMode) {
      let userData = Object.values(mdDetailsById).find((md) => String(md.id) === id);
      reset({
        name: userData?.name as string,
        phoneNumber: userData?.phoneNumber as unknown as string,
        qualification: userData?.qualification as string,
        dob: dateFormat(userData?.dob) as string,
        signature: "",
        profile: decryptText(userData?.profile as string),
      });
    }

    return () =>
      reset({
        name: "",
        phoneNumber: "",
        qualification: "",
        dob: "",
        signature: "",
        profile: "",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);
  // }, [editMode, id]);

  const onSubmit: any = async (data: IAddMDDetailsFormInput & { id: string }) => {
    const encryptedBase64 = await encryptFile(data.profile, true);

    cb({
      name: data.name,
      phoneNumber: data.phoneNumber,
      qualification: data.qualification,
      dob: dateFormat(data.dob),
      signature: data.signature,
      profile: encryptedBase64,
      id: editMode ? id : uuidv4(),
    } as IAddMDDetailsFormInput & { id: string });
    // handleClose();
    // reset();
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
        {editMode ? "Edit MD Details" : "Add MD Details"}
      </ModalHeader>
      <ModalBody id="mdDetails" onSubmit={handleSubmit(onSubmit)}>
        <FormField setValue={setValue} control={control as unknown as Control} getValues={getValues} unregister={unregister} />
      </ModalBody>
      <ModalFooter>
        <Button form="mdDetails" type="submit" disabled={enableButton}>
          Submit
        </Button>
      </ModalFooter>
    </CustomModal>
  );
};

export default MdDetailsModal;

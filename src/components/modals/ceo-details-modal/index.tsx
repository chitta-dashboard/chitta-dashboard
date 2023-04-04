import { Control, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { FC, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { s3ConfigTypes } from "../../../types";
import { uploadProfile } from "../../../services/s3-client";
import { extractProfileName, generateProfileName } from "../../../utils/helpers";
import { dateFormat, ENDPOINTS, imageCompressor } from "../../../utils/constants";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import { IAddCEODetailsFormInput } from "../type/formInputs";
import FormField from "./body/formField";
import { useFetch } from "../../../utils/hooks/query";
import placeHolderImg from "../../../assets/images/profile-placeholder.jpg";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  cb: (data: IAddCEODetailsFormInput & { id: string }) => void;
  editMode?: boolean;
  id?: string;
}

const CeoDetailsModal: FC<CustomProps> = ({ openModal, handleClose, cb, editMode = false, id = "" }) => {
  //constants
  const { formatChangeSuccess: isSuccess, result } = useFetch(ENDPOINTS.ceo);
  const { data: ceoDetailsById } = result;
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
    if (editMode && isSuccess) {
      let userData = id && ceoDetailsById[id];
      reset({
        name: userData?.name as string,
        joinedDate: userData?.joinedDate as string,
        phoneNumber: userData?.phoneNumber as unknown as string,
        qualification: userData?.qualification as string,
        dob: dateFormat(userData?.dob) as string,
        description: userData?.description as string,
        profile: userData?.profile || placeHolderImg,
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

  //functions
  const onSubmit: any = async (data: IAddCEODetailsFormInput & { id: string }) => {
    data = { ...data, id: editMode ? id : uuidv4() };
    const profileName = editMode ? extractProfileName(ceoDetailsById[id].profile) : `${s3ConfigTypes.ceo}_${data.id}_${Date.now()}`;
    const profileBlob = await fetch(data.profile).then((res) => res.blob());
    const compressedProfile = await imageCompressor(profileBlob);
    const namedProfile = generateProfileName(compressedProfile, profileName);
    const profile = await uploadProfile(namedProfile, s3ConfigTypes.ceo);
    cb({
      description: data.description,
      dob: dateFormat(data.dob),
      name: data.name,
      joinedDate: data?.joinedDate,
      phoneNumber: data.phoneNumber,
      profile,
      qualification: data.qualification,
      id: data.id,
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

import { Control, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { deleteProfile, uploadProfile } from "../../../services/s3-client";
import { createJoinDate, dateFormat, ENDPOINTS, imageCompressor } from "../../../utils/constants";
import { extractProfileName, generateProfileName } from "../../../utils/helpers";
import { s3ConfigTypes } from "../../../types";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import { IAddFounderDetailsFormInput } from "../type/formInputs";
import { useFetch } from "../../../utils/hooks/query";
import FormField from "./body/formField";
import placeHolderImg from "../../../assets/images/profile-placeholder.jpg";
window.Buffer = require("buffer").Buffer;

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  cb: (data: IAddFounderDetailsFormInput & { id: string }) => void;
  editMode?: boolean;
  id?: string;
}

const FoundersModal: FC<CustomProps> = ({ openModal, handleClose, cb, editMode = false, id = "" }) => {
  //state values
  const [imageUrl, setImageUrl] = useState("");
  //constants
  const { formatChangeSuccess: isSuccess, result } = useFetch(ENDPOINTS.founders);
  const { data: foundersById } = result;

  const { handleSubmit, reset, clearErrors, setValue, getValues, control: formControl, unregister, watch } = useForm<IAddFounderDetailsFormInput>();

  // submit button enabling

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
      let userData = id && foundersById[id];
      reset({
        name: userData?.name as string,
        phoneNumber: userData?.phoneNumber as unknown as string,
        qualification: userData?.qualification as string,
        dob: dateFormat(userData?.dob) as string,
        description: userData?.description as string,
        profile: userData?.profile || placeHolderImg,
        joinDate: userData?.joinDate,
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
        joinDate: "",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);
  // }, [editMode, id]);

  //functions
  const onSubmit: any = async (data: IAddFounderDetailsFormInput & { id: string }) => {
    data = { ...data, id: editMode ? id : uuidv4() };
    let profile = "";
    if (editMode && data.profile === foundersById[id].profile) {
      profile = data.profile;
    } else {
      const profileBlob = await fetch(data.profile).then((res) => res.blob());
      const compressedProfile = await imageCompressor(profileBlob);
      const namedProfile = generateProfileName(compressedProfile, `${s3ConfigTypes.founder}_${data.id}_${Date.now()}`);
      profile = editMode ? (namedProfile as unknown as string) : await uploadProfile(namedProfile, s3ConfigTypes.founder);
    }

    cb({
      description: data.description,
      dob: dateFormat(data.dob),
      name: data.name,
      phoneNumber: data.phoneNumber,
      profile,
      qualification: data.qualification,
      id: data.id,
      joinDate: createJoinDate(),
    } as IAddFounderDetailsFormInput & { id: string });
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
        {editMode ? " Edit Founder Details" : " Add Founder Details "}
      </ModalHeader>
      <ModalBody id="mdDetails" onSubmit={handleSubmit(onSubmit)}>
        <FormField setValue={setValue} getValues={getValues} control={formControl as unknown as Control} unregister={unregister} />
      </ModalBody>
      <ModalFooter>
        <Button form="mdDetails" type="submit" disabled={enableButton}>
          Submit
        </Button>
      </ModalFooter>
    </CustomModal>
  );
};

export default FoundersModal;

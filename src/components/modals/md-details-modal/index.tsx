import { Control, useForm } from "react-hook-form";
import { Button, Stack } from "@mui/material";
import { FC, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
// import AddProfile from "../../buttons/add-profile-icon-and-button";
import AddProfile from "../../input-fields/add-profile";
import FormField from "./body/formField";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import { IAddMDDetailsFormInput } from "../type/formInputs";
import { useMdDetailsContext } from "../../../utils/context/mdDetails";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import { fileValidation } from "../../../utils/constants";
import { dateFormat } from "../../../utils/constants";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  cb: (data: IAddMDDetailsFormInput & { id: string }) => void;
  editMode?: boolean;
  id?: string;
}
const schema = yup
  .object({
    name: yup.string().required("required"),
    phoneNumber: yup
      .string()
      .required("required")
      .matches(/^\d{10}$/, "10 digits expected"),
    qualification: yup.string().required("required"),
    dob: yup.string().required("required"),
    signature: yup
      .mixed()
      .test("signatureTest1", "required", (file: File) => {
        if (typeof file === "string" && (file as string).length > 0) return true; // passes cropped image url
        return file?.size > 0;
      })
      .test("signatureTest2", "expected format: .jpg, .jpeg, .png", (file: File) => {
        if (typeof file === "string" && (file as string).length > 0) return true; // passes cropped image url
        return fileValidation(file ? file?.name : "");
      }),
    profile: yup
      .mixed()
      .test("profileTest1", "required", (file: File) => {
        if (typeof file === "string" && (file as string).length > 0) return true; // passes cropped image url
        return file?.size > 0;
      })
      .test("profileTest2", "expected format: .jpg, .jpeg, .png", (file: File) => {
        if (typeof file === "string" && (file as string).length > 0) return true; // passes cropped image url
        return fileValidation(file ? file?.name : "");
      }),
  })
  .required();

const MdDetailsModal: FC<CustomProps> = ({ openModal, handleClose, cb, editMode = false, id = "" }) => {
  let { mdDetailsById } = useMdDetailsContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
    setValue,
    getValues,
    trigger,
    unregister,
    control: formControl,
    watch,
  } = useForm<IAddMDDetailsFormInput>({
    resolver: yupResolver(schema),
  });

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
        signature: userData?.signature, // temporary, until sbucket integration
        profile: userData?.profile, // temporary, until sbucket integration
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

  const onSubmit: any = (data: IAddMDDetailsFormInput & { id: string }) => {
    cb({
      name: data.name,
      phoneNumber: data.phoneNumber,
      qualification: data.qualification,
      dob: dateFormat(data.dob),
      signature: data.signature,
      profile: data.profile,
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
        <Stack spacing={4}>
          {/* <AddProfile setValue={setValue} trigger={trigger} inputName="profile" errors={errors} /> */}
          <AddProfile<IAddMDDetailsFormInput>
            inputName="profile"
            control={formControl as unknown as Control}
            rules={{
              required: "required",
              validate: {
                fileFormat: (file: File) => {
                  if (typeof file === "string" && (file as string).length > 0) return true; // passes cropped image url
                  return fileValidation(file ? file?.name : "") || "expected format: .jpg, .jpeg, .png";
                },
              },
            }}
            setValue={setValue}
            getValues={getValues}
            unregister={unregister}
            gridArea="prf"
          />
          <FormField register={register} errors={errors} setValue={setValue} trigger={trigger} setError={setError} clearErrors={clearErrors} />
        </Stack>
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

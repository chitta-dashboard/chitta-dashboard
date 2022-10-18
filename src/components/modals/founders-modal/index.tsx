import * as yup from "yup";
import { Control, useForm } from "react-hook-form";
import { Button, Stack } from "@mui/material";
import { FC, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";
import { fileValidation, createJoinDate } from "../../../utils/constants";
import { useFounderContext } from "../../../utils/context/founders";
import AddProfile from "../../input-fields/add-profile";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import { dateFormat } from "../../../utils/constants";
import { IAddCEODetailsFormInput } from "../type/formInputs";
import FormField from "./body/formField";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  cb: (data: IAddCEODetailsFormInput & { id: string }) => void;
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
    description: yup.string().required("required"),
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

const FoundersModal: FC<CustomProps> = ({ openModal, handleClose, cb, editMode = false, id = "" }) => {
  let { foundersById } = useFounderContext();

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
    control: formControl,
    unregister,
    watch,
  } = useForm<IAddCEODetailsFormInput>({
    resolver: yupResolver(schema),
  });

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
    if (editMode) {
      let userData = Object.values(foundersById).find((f) => String(f.id) === id);
      reset({
        name: userData?.name as string,
        phoneNumber: userData?.phoneNumber as unknown as string,
        qualification: userData?.qualification as string,
        dob: dateFormat(userData?.dob) as string,
        description: userData?.description as string,
        profile: userData?.profile, // temporary, until sbucket integration
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

  const onSubmit: any = (data: IAddCEODetailsFormInput & { id: string }) => {
    cb({
      description: data.description,
      dob: dateFormat(data.dob),
      name: data.name,
      phoneNumber: data.phoneNumber,
      profile: data.profile,
      qualification: data.qualification,
      id: editMode ? id : uuidv4(),
      joinDate: createJoinDate(),
    } as IAddCEODetailsFormInput & { id: string });
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
        <Stack spacing={4}>
          <AddProfile<IAddCEODetailsFormInput>
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

export default FoundersModal;

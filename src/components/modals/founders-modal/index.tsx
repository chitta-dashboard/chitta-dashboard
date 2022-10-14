import { Control, useForm } from "react-hook-form";
import { Button, Stack } from "@mui/material";
import { FC, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import AddProfile from "../../input-fields/add-profile";
import FormField from "./body/formField";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import { IAddCEODetailsFormInput } from "../type/formInputs";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import { fileValidation } from "../../../utils/constants";
import { useFounderContext } from "../../../utils/context/founders";

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
    phoneNumber: yup.string().required("required"),
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
    formState: { errors, isValid },
    reset,
    setError,
    clearErrors,
    setValue,
    getValues,
    trigger,
    control: formControl,
    unregister,
  } = useForm<IAddCEODetailsFormInput>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (editMode) {
      let userData = Object.values(foundersById).find((f) => String(f.id) === id);
      reset({
        name: userData?.name as string,
        phoneNumber: userData?.phoneNumber as unknown as string,
        qualification: userData?.qualification as string,
        dob: userData?.dob as string,
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
    cb({ ...data, id: editMode ? id : uuidv4() } as IAddCEODetailsFormInput & { id: string });
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
        {editMode ? " Edit Founder's Details" : " Add Founder's Details "}
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
        <Button form="mdDetails" type="submit" disabled={!isValid}>
          Submit
        </Button>
      </ModalFooter>
    </CustomModal>
  );
};

export default FoundersModal;

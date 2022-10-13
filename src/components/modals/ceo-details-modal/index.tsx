import { useForm } from "react-hook-form";
import { Button, Stack } from "@mui/material";
import { FC, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import AddProfile from "../../buttons/add-profile-icon-and-button";
import FormField from "./body/formField";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import { IAddCEODetailsFormInput } from "../type/formInputs";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import { fileValidation } from "../../../utils/constants";
import { useCeoDetailsContext } from "../../../utils/context/ceoDetails";

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

const CeoDetailsModal: FC<CustomProps> = ({ openModal, handleClose, cb, editMode = false, id = "" }) => {
  let { ceoDetailsById } = useCeoDetailsContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
    setValue,
    trigger,
  } = useForm<IAddCEODetailsFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (editMode) {
      let userData = Object.values(ceoDetailsById).find((ceo) => String(ceo.id) === id);
      reset({
        name: userData?.name as string,
        phoneNumber: userData?.phoneNumber as unknown as string,
        qualification: userData?.qualification as string,
        dob: userData?.dob as string,
        description: userData?.description as string,
        profile: "", // temporary, until sbucket integration
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
        {editMode ? " Edit CEO's Details" : " Add CEO's Details "}
      </ModalHeader>
      <ModalBody id="mdDetails" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <AddProfile setValue={setValue} trigger={trigger} inputName="profile" errors={errors} />
          <FormField register={register} errors={errors} setValue={setValue} trigger={trigger} setError={setError} clearErrors={clearErrors} />
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Button form="mdDetails" type="submit">
          Submit
        </Button>
      </ModalFooter>
    </CustomModal>
  );
};

export default CeoDetailsModal;

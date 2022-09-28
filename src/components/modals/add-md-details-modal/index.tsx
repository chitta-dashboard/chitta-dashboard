import { useForm } from "react-hook-form";
import {Stack} from '@mui/material'
import { FC, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import AddProfile from "../../buttons/add-profile-icon-and-button";
import FormField from "./body/formField";
import CustomModal from "../../custom-modal";
import Submit from "../../buttons/submit-button";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import { useMdDetailsContext } from "../../../utils/context/md-details";
import { IAddMDDetailsFormInput } from "../type/formInputs";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  cb: (data: IAddMDDetailsFormInput) => void;
  editMode?: boolean;
  id?: string;
}
const schema = yup
  .object({
    name: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
    qualification: yup.string().required("required"),
    dob: yup.string().required("required"),
    signature: yup.mixed().test("required", "photo is required", (value: FileList) => {
      return value.length > 0;
    }),
  })
  .required();

const AddMdDetailsModal: FC<CustomProps> = ({ openModal, handleClose, cb, editMode = false, id = "" }) => {
  let { mdList } = useMdDetailsContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IAddMDDetailsFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (editMode) {
      let userData = mdList.find((md) => String(md.id) === id);
      reset({
        name: userData?.name as string,
        phoneNumber: userData?.mobileNo as unknown as string,
        qualification: userData?.degree as string,
        dob: userData?.dob as string,
        signature: userData?.signature as string,
      });
    }

    return () =>
      reset({
        name: "",
        phoneNumber: "",
        qualification: "",
        dob: "",
        signature: "",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode, id]);

  const onSubmit: any = (data: IAddMDDetailsFormInput) => {
    cb(data);
    handleClose();
    reset();
  };

  return (
    <>
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
          Add MD Details
        </ModalHeader>

        <ModalBody id="mdDetails" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>

          <AddProfile />
          <FormField register={register} errors={errors} />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Submit
            formId="mdDetails"
            handleSubmit={() => {
              clearErrors();
              handleClose();
            }}
          />
        </ModalFooter>
      </CustomModal>
    </>
  );
};

export default AddMdDetailsModal;

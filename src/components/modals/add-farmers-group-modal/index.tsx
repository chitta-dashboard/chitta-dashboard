import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Submit from "../../buttons/submit-button";
import CustomModal from "../../custom-modal";
import FormField from "./body/formField";
import { IAddFarmersGroupFormInput } from "../type/formInputs";

import ModalHeader from "../../custom-modal/header";

interface CustomProps {
  cb: (data: IAddFarmersGroupFormInput) => void;
  openModal: boolean;
  handleClose: () => void;
}

const schema = yup
  .object({
    groupName: yup.string().required("required"),
    explanation: yup.string().required("required"),
    chairman: yup.string().required("required"),
    treasurer: yup.string().required("required"),
    secretary: yup.string().required("required"),
  })
  .required();

const AddFarmersGroupModal: FC<CustomProps> = ({ openModal, handleClose, cb }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IAddFarmersGroupFormInput>({
    resolver: yupResolver(schema),
  });
  const onSubmit: any = (data: IAddFarmersGroupFormInput) => {
    cb(data);
    handleClose();
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
          Add Farmer's Group
        </ModalHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField register={register} errors={errors} />
          <Submit />
        </form>
      </CustomModal>
    </>
  );
};
export default AddFarmersGroupModal;

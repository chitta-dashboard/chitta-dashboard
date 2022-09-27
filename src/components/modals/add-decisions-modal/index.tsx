import { FC } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CustomModal from "../../custom-modal";
import FormField from "./body/formField";
import SubmitButton from "../../buttons/submit-button";
import { IAddDecisionsFormInput } from "../type/formInputs";
import ModalHeader from "../../custom-modal/header";

interface CustomProps {
  cb: (data: IAddDecisionsFormInput) => void;
  openModal: boolean;
  handleClose: () => void;
}

const schema = yup
  .object({
    decisionHeading: yup.string().required("required"),
    dob: yup.string().required("required"),
    qualification: yup.string().required("required"),
    decision: yup.string().required("required"),
  })
  .required();

const AddDecisionsModal: FC<CustomProps> = ({ cb, openModal, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IAddDecisionsFormInput>({
    resolver: yupResolver(schema),
  });
  const onSubmit: any = (data: IAddDecisionsFormInput) => {
    console.log(data);
    cb && cb(data);
    reset();
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
        openAddDecisionModal={true}
      >
        <ModalHeader
          handleClose={() => {
            clearErrors();
            reset();
            handleClose();
          }}
        >
          Add Decisions
        </ModalHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField register={register} errors={errors} />
          <SubmitButton handleSubmit={() => {}} />
        </form>
      </CustomModal>
    </>
  );
};
export default AddDecisionsModal;

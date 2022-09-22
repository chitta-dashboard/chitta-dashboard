import { DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Submit from "../../buttons/submit-button";
import CustomModal from "../../custom-modal";
import TitleCloseButton from "../../buttons/title-close-button";
import Props from "../type/modalProps";
import FormField from "./body/formField";

import S from "./body/addFarmersGroupModal.styled";

interface IFormInputs {
  GroupName: string;
  explanation: string;
  Chairman: string;
  Treasurer: string;
  Secretary: string;
}
const schema = yup
  .object({
    GroupName: yup.string().required("required"),
    explanation: yup.string().required("required"),
    Chairman: yup.string().required("required"),
    Treasurer: yup.string().required("required"),
    Secretary: yup.string().required("required"),
  })
  .required();

const AddFarmersGroupModal = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: any = (data: IFormInputs) => {
    reset();
  };
  return (
    <>
      <CustomModal
        label={""}
        openModal={props.openModal}
        handleClose={() => {
          clearErrors();
          if (props.handleClose) props.handleClose();
        }}
      >
        <DialogTitle>
          <S.Title>Add Farmer's Group</S.Title>
          <TitleCloseButton
            label={""}
            openModal={props.openModal}
            handleClose={() => {
              clearErrors();
              if (props.handleClose) props.handleClose();
            }}
          />
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField openModal={props.openModal} register={register} error={errors} />
          <Submit label={""} openModal={props.openModal} handleClose={() => {}} />
        </form>
      </CustomModal>
    </>
  );
};
export default AddFarmersGroupModal;

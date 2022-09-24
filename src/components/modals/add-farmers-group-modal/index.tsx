import { DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Submit from "../../buttons/submit-button";
import CustomModal from "../../custom-modal";
import TitleCloseButton from "../../buttons/title-close-button";
import Props from "../type/modalProps";
import FormField from "./body/formField";
import { useFarmerGroupDetailsContext } from "../../../utils/context/farmers-group";
import { farmerGroupDetail } from "../../../utils/context/farmers-group";

import S from "./body/addFarmersGroupModal.styled";

const schema = yup
  .object({
    groupName: yup.string().required("required"),
    explanation: yup.string().required("required"),
    chairman: yup.string().required("required"),
    treasurer: yup.string().required("required"),
    secretary: yup.string().required("required"),
  })
  .required();

const AddFarmersGroupModal = (props: Props) => {
  const { addFarmerGroupDetail, farmerGroupList } = useFarmerGroupDetailsContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<farmerGroupDetail>({
    resolver: yupResolver(schema),
  });
  const onSubmit: any = (data: farmerGroupDetail) => {
    let newUser = { id: farmerGroupList.length + 1, ...data };
    reset();
    addFarmerGroupDetail(newUser);
  };
  return (
    <>
      <CustomModal
        openModal={props.openModal}
        handleClose={() => {
          clearErrors();
          if (props.handleClose) props.handleClose();
        }}
      >
        <DialogTitle>
          <S.Title>Add Farmer's Group</S.Title>
          <TitleCloseButton
            openModal={props.openModal}
            handleClose={() => {
              clearErrors();
              if (props.handleClose) props.handleClose();
            }}
          />
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField openModal={props.openModal} register={register} error={errors} />
          <Submit openModal={props.openModal} handleClose={() => {}} />
        </form>
      </CustomModal>
    </>
  );
};
export default AddFarmersGroupModal;

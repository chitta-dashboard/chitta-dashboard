import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import SubmitButton from "../../buttons/submit-button";
import CustomModal from "../../custom-modal";
import FormField from "./body/formField";
import { IAddFarmersGroupFormInput } from "../type/formInputs";

import ModalHeader from "../../custom-modal/header";
import { useFarmerDetailsContext } from "../../../utils/context/farmers-details";
import { useFarmerGroupDetailsContext } from "../../../utils/context/farmers-group";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";

interface CustomProps {
  cb: (data: IAddFarmersGroupFormInput) => void;
  openModal: boolean;
  handleClose: () => void;
  editMode?: boolean;
  id?: string;
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

const AddFarmersGroupModal: FC<CustomProps> = ({ openModal, handleClose, cb, editMode = false, id }) => {
  const { farmerGroupList } = useFarmerGroupDetailsContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IAddFarmersGroupFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (editMode) {
      let groupData = farmerGroupList.find((f) => String(f.id) === id);
      reset({
        groupName: groupData?.groupName as string,
        explanation: groupData?.description as string,
        chairman: groupData?.leader as string,
        treasurer: groupData?.treasurer as string,
        secretary: groupData?.secretary as string,
      });
    }
    return () =>
      reset({
        groupName: "",
        explanation: "",
        chairman: "",
        treasurer: "",
        secretary: "",
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode, id]);

  const onSubmit: any = (data: IAddFarmersGroupFormInput) => {
    cb(data);
    reset();
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
          Add Farmer's Group
        </ModalHeader>

        <ModalBody id={"farmersGroup"} onSubmit={handleSubmit(onSubmit)}>
          <FormField register={register} errors={errors} />
        </ModalBody>

        <ModalFooter>
          <SubmitButton formId="farmersGroup" handleSubmit={() => {}} />
        </ModalFooter>
      </CustomModal>
    </>
  );
};
export default AddFarmersGroupModal;

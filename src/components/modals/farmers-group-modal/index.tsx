import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

import CustomModal from "../../custom-modal";
import FormField from "./body/formField";
import { IAddFarmersGroupFormInput } from "../type/formInputs";

import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import { useFarmerGroupDetailsContext } from "../../../utils/context/farmersGroup";
import SubmitButton from "../../buttons/submit-button";

interface CustomProps {
  cb: (data: IAddFarmersGroupFormInput & { id: string }) => void;
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

const FarmersGroupModal: FC<CustomProps> = ({ openModal, handleClose, cb, editMode = false, id = "" }) => {
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
        explanation: groupData?.explanation as string,
        chairman: groupData?.chairman as string,
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

  const onSubmit: any = (data: IAddFarmersGroupFormInput & { id: string }) => {
    cb({ ...data, id: editMode ? id : uuidv4() });
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
export default FarmersGroupModal;

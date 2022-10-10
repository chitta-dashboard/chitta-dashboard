import * as yup from "yup";
import { FC, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useFarmersGroupContext } from "../../../utils/context/farmersGroup";
import { IAddFarmersGroupFormInput } from "../type/formInputs";
import CustomModal from "../../custom-modal";
import FormField from "./body/formField";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";

interface CustomProps {
  cb: (data: IAddFarmersGroupFormInput & { id: string; members: string[] }) => void;
  openModal: boolean;
  handleClose: () => void;
  editMode?: boolean;
  id?: string;
}

const schema = yup
  .object({
    groupName: yup.string().required("required"),
    explanation: yup.string().required("required"),
    chairman: yup
      .string()
      .required("required")
      .test("chairman", "choose a option", (value: string | undefined) => {
        const selectOptions = ["option-1", "option-2", "option-3"];
        if (selectOptions.includes(value as string)) {
          return true;
        }
        return false;
      }),
    treasurer: yup
      .string()
      .required("required")
      .test("chairman", "choose a option", (value: string | undefined) => {
        const selectOptions = ["option-1", "option-2", "option-3"];
        if (selectOptions.includes(value as string) && value) {
          return true;
        }
        return false;
      }),
    secretary: yup
      .string()
      .required("required")
      .test("chairman", "choose a option", (value: string | undefined) => {
        const selectOptions = ["option-1", "option-2", "option-3"];
        if (selectOptions.includes(value as string)) {
          return true;
        }
        return false;
      }),
  })
  .required();

const FarmersGroupModal: FC<CustomProps> = ({ openModal, handleClose, cb, editMode = false, id = "" }) => {
  const { farmersGroupList } = useFarmersGroupContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    setValue,
    trigger,
  } = useForm<IAddFarmersGroupFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (editMode) {
      let groupData = Object.values(farmersGroupList).find((f) => String(f.id) === id);
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

  const onSubmit: any = (data: IAddFarmersGroupFormInput & { id: string; members: string[] }) => {
    cb({ ...data, id: editMode ? id : uuidv4(), members: [] });
    reset();
    handleClose();
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
        Add Farmer's Group
      </ModalHeader>

      <ModalBody id={"farmersGroup"} onSubmit={handleSubmit(onSubmit)}>
        <FormField register={register} errors={errors} setValue={setValue} trigger={trigger} />
      </ModalBody>

      <ModalFooter>
        <Button form="farmersGroup" type="submit">
          Submit
        </Button>
      </ModalFooter>
    </CustomModal>
  );
};
export default FarmersGroupModal;

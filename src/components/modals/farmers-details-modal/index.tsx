import { FC, useCallback, useEffect, useState } from "react";
import { Control, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { farmerDetail, useFarmerDetailsContext } from "../../../utils/context/farmersDetails";
import { useFarmersGroupContext } from "../../../utils/context/farmersGroup";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import FormField from "./page-1-fields";
import FormFieldPage2 from "./page-2-fields";
import { IAddFarmersDetailsFormInput, IAddFarmersDetailsPage1Input, IAddFarmersDetailsPage2Input } from "../type/formInputs";
import S from "./farmersDetailsModal.styled";
import page1 from "../../../assets/images/page-1.svg";
import page2 from "../../../assets/images/page-2.svg";

interface CustomProps {
  cb: (data: IAddFarmersDetailsFormInput & { id: string; membershipId: string }) => void;
  openModal: boolean;
  handleClose: () => void;
  editMode?: boolean;
  id?: string;
}

const FarmersDetailsModalHandler: FC<CustomProps> = ({ openModal, handleClose, cb, editMode = false, id = "" }) => {
  const [next, setNext] = useState(false);
  const [form1Data, setForm1Data] = useState({});
  const { farmersDetailsById } = useFarmerDetailsContext();
  const { addGroupMembers } = useFarmersGroupContext();

  const [dynamicInputs, setDynamicInputs] = useState<Array<{ [key: string]: [string, string, string] }>>(() => {
    if (editMode) {
      let farmerData = Object.values(farmersDetailsById).find((f) => String(f.id) === id) as farmerDetail;
      let masterKey = "";
      let surveyName = "";
      let acreName = "";
      let borderName = "";
      let temp: Array<{ [key: string]: [string, string, string] }> = [];

      farmerData &&
        Object.keys(farmerData.acre).map((item, index) => {
          masterKey = uuidv4();
          surveyName = Object.keys(farmerData.surveyNo)[index];
          acreName = item;
          borderName = Object.keys(farmerData.border)[index];
          temp = [...temp, { [masterKey]: [surveyName, acreName, borderName] }];
          return undefined;
        });
      return temp;
    }
    return [{ first: ["surveyNo-first", "acre-first", "border-first"] }];
  });

  const addInput = useCallback(() => {
    const surveyName = "surveyNo-" + uuidv4();
    const acreName = "acre-" + uuidv4();
    const borderName = "border-" + uuidv4();
    const masterKey = uuidv4();

    setDynamicInputs([...dynamicInputs, { [masterKey]: [surveyName, acreName, borderName] }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dynamicInputs]);

  const removeInput = useCallback(
    (key: string) => {
      setDynamicInputs(dynamicInputs.filter((inp) => Object.keys(inp)[0] !== key));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dynamicInputs],
  );

  const {
    handleSubmit: form1handleSubmit,
    setValue: form1SetValue,
    getValues: form1GetValues,
    reset: form1Reset,
    unregister: form1Unregister,
    control: form1Control,
  } = useForm<IAddFarmersDetailsPage1Input>({});

  const {
    handleSubmit: form2HandleSubmit,
    reset: form2Reset,
    clearErrors: form2ClearErrors,
    control: form2Control,
  } = useForm<IAddFarmersDetailsPage2Input>({});

  useEffect(() => {
    if (editMode) {
      let farmerData = Object.values(farmersDetailsById).find((f) => String(f.id) === id) as farmerDetail;
      form1Reset({
        name: farmerData?.name,
        fatherName: farmerData?.fatherName,
        sex: farmerData?.sex,
        spouseName: farmerData?.spouseName,
        dob: farmerData?.dob,
        group: farmerData?.group,
        phoneNumber: farmerData?.phoneNumber,
        addhaarNo: farmerData?.addhaarNo,
        ...farmerData?.surveyNo,
        ...farmerData?.acre,
        ...farmerData?.border,
        surveyNo: farmerData?.surveyNo,
        acre: farmerData?.acre,
        border: farmerData?.border,
        profile: farmerData?.profile, //temporary, until sbucket integration
      });

      form2Reset({
        education: farmerData?.education,
        village: farmerData?.village,
        postalNo: farmerData?.postalNo,
        address: farmerData?.address,
        taluk: farmerData?.taluk,
        district: farmerData?.district,
        landType: farmerData?.landType,
        waterType: farmerData?.waterType,
        farmerType: farmerData?.farmerType,
        animals: farmerData?.animals,
        groupMember: farmerData?.groupMember,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode, id]);

  const form1Submit: any = (data: IAddFarmersDetailsPage1Input) => {
    setForm1Data(data);
    setNext(true);
  };

  const form2Submit: any = (data: IAddFarmersDetailsPage2Input) => {
    let params = { ...form1Data, ...data, id: editMode ? id : uuidv4(), membershipId: "NEF-FPC-2" } as IAddFarmersDetailsPage1Input &
      IAddFarmersDetailsPage2Input & { id: string; membershipId: string };
    cb({ ...params } as IAddFarmersDetailsFormInput & { id: string; membershipId: string });
    const newMember = { id: params.id, group: params.group };
    addGroupMembers(newMember);
    handleClose();
  };

  return (
    <CustomModal openModal={openModal} handleClose={handleClose}>
      <ModalHeader handleClose={handleClose}>Add Farmer's Details</ModalHeader>

      {next ? (
        <>
          <ModalBody id={"farmersDetailsForm2"} onSubmit={form2HandleSubmit(form2Submit)}>
            <FormFieldPage2 control={form2Control as unknown as Control} />
          </ModalBody>
          <ModalFooter>
            <S.PageNumber alt="page number 2" src={page2} />
            <S.ButtonContainer>
              <Button
                onClick={() => {
                  form2ClearErrors();
                  setNext(!next);
                }}
              >
                Back
              </Button>
              <Button type="submit" form={"farmersDetailsForm2"}>
                Submit
              </Button>
            </S.ButtonContainer>
          </ModalFooter>
        </>
      ) : (
        <>
          <ModalBody id={"farmersDetailsForm1"} onSubmit={form1handleSubmit(form1Submit)}>
            <FormField
              dynamicInputs={dynamicInputs}
              addInput={addInput}
              removeInput={removeInput}
              control={form1Control as unknown as Control}
              setValue={form1SetValue}
              getValues={form1GetValues}
              unregister={form1Unregister}
              editMode={editMode}
            />
          </ModalBody>
          <ModalFooter>
            <S.PageNumber alt="page number 1" src={page1} />
            <Button type="submit" form={"farmersDetailsForm1"}>
              Next
            </Button>
          </ModalFooter>
        </>
      )}
    </CustomModal>
  );
};

// need this approach to reset all state memory whenever the modal closes
// using reset() will only reset the form data, the states will not be reinitialized without this approach.
const FarmersDetailsModal: FC<CustomProps> = (props) => {
  return props.openModal ? <FarmersDetailsModalHandler {...props} /> : null;
};
export default FarmersDetailsModal;

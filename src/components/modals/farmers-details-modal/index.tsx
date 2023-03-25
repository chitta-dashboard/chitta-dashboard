import { FC, useCallback, useEffect, useState } from "react";
import { Control, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { farmerDetail, useFarmerDetailsContext } from "../../../utils/context/farmersDetails";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import FormField from "./page-1-fields";
import FormFieldPage2 from "./page-2-fields";
import FormFieldPage3 from "./page-3-fields";
import {
  IAddFarmersDetailsFormInput,
  IAddFarmersDetailsPage1Input,
  IAddFarmersDetailsPage2Input,
  IAddFarmersDetailsPage3Input,
} from "../type/formInputs";
import { dateFormat, ENDPOINTS, decryptText, imageCompressor, encryptText, ACRETOCENT } from "../../../utils/constants";
import { useFetch } from "../../../utils/hooks/query";
import placeHolderImg from "../../../assets/images/profile-placeholder.jpg";
import S from "./farmersDetailsModal.styled";

interface CustomProps {
  cb: (data: IAddFarmersDetailsFormInput & { id: string; membershipId: string; farmerId?: string }) => void;
  openModal: boolean;
  handleClose: () => void;
  editMode?: boolean;
  id?: string;
  mdId?: string;
}
const FarmersDetailsModalHandler: FC<CustomProps> = (props) => {
  const { farmerBankDetail } = useFarmerDetailsContext();
  const { openModal, handleClose, cb, editMode = false, id = "", mdId = "" } = props;
  let {
    formatChangeSuccess: isSuccess,
    result: { data: farmersDetailsById },
  } = useFetch(ENDPOINTS.farmerDetails);

  const [page, setPage] = useState(1);
  const [form1Data, setForm1Data] = useState<IAddFarmersDetailsPage1Input>();
  const [form2Data, setForm2Data] = useState<IAddFarmersDetailsPage2Input>();
  const [selectedKey, setSelectedKey] = useState<string[]>([]);
  const [isPhoneExist, setIsPhoneExist] = useState(false);

  const [dynamicInputs, setDynamicInputs] = useState<Array<{ [key: string]: [string, string, string] }>>(() => {
    if (editMode) {
      let farmerData = Object.values(isSuccess && (farmersDetailsById as farmerDetail)).find((f) => String(f.id) === id) as farmerDetail;
      let masterKey = "";
      let surveyName = "";
      let acreName = "";
      let borderName = "";
      let temp: Array<{ [key: string]: [string, string, string] }> = [];

      farmerData &&
        Object.keys(farmerData.acre).map((item, index) => {
          masterKey = uuidv4();
          surveyName = farmerData && Object.keys(farmerData.surveyNo)[index];
          acreName = item;
          borderName = farmerData && Object.keys(farmerData.border)[index];
          temp = [...temp, { [masterKey]: [surveyName, acreName, borderName] }];
          return undefined;
        });
      return temp.reverse();
    }
    return [{ first: ["surveyNo-first", "acre-first", "border-first"] }];
  });

  const addInput = useCallback(() => {
    const surveyName = "surveyNo-" + uuidv4();
    const acreName = "acre-" + uuidv4();
    const borderName = "border-" + uuidv4();
    const masterKey = uuidv4();

    setDynamicInputs([{ [masterKey]: [surveyName, acreName, borderName] }, ...dynamicInputs]);
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
    watch: form1Watch,
  } = useForm<IAddFarmersDetailsPage1Input>({});

  const {
    handleSubmit: form2HandleSubmit,
    reset: form2Reset,
    clearErrors: form2ClearErrors,
    control: form2Control,
    watch: form2Watch,
  } = useForm<IAddFarmersDetailsPage2Input>({
    mode: "onChange",
  });

  const {
    handleSubmit: form3HandleSubmit,
    reset: form3Reset,
    clearErrors: form3ClearErrors,
    control: form3Control,
    watch: form3Watch,
  } = useForm<IAddFarmersDetailsPage3Input>({
    mode: "onChange",
  });

  // submit button enabling

  let form1EnableButton = true;
  const nameEvent = form1Watch("name");
  const fatherNameEvent = form1Watch("fatherName");
  const sexEvent = form1Watch("sex");
  const spouseNameEvent = form1Watch("spouseName");
  const dobEvent = form1Watch("dob");
  const groupEvent = form1Watch("group");
  const phoneNumberEvent = form1Watch("phoneNumber");
  const addhaarNoEvent = form1Watch("addhaarNo");
  const surveyNoEvent = form1Watch("surveyNo");
  const acreEvent = form1Watch("acre");
  const borderEvent = form1Watch("border");
  const profileEvent = form1Watch("profile");
  if (
    nameEvent &&
    fatherNameEvent &&
    sexEvent &&
    spouseNameEvent &&
    dobEvent &&
    groupEvent &&
    phoneNumberEvent &&
    addhaarNoEvent &&
    surveyNoEvent &&
    acreEvent &&
    borderEvent &&
    profileEvent &&
    !Object.values(surveyNoEvent).includes("") &&
    !Object.values(acreEvent).includes("") &&
    !Object.values(borderEvent).includes("") &&
    Object.values(surveyNoEvent).length === dynamicInputs.length &&
    Object.values(acreEvent).length === dynamicInputs.length &&
    Object.values(borderEvent).length === dynamicInputs.length
  ) {
    form1EnableButton = false;
  }

  let form2EnableButton = true;
  const qualificationEvent = form2Watch("qualification");
  const villageEvent = form2Watch("village");
  const postalNoEvent = form2Watch("postalNo");
  const addressEvent = form2Watch("address");
  const talukEvent = form2Watch("taluk");
  const districtEvent = form2Watch("district");
  const landTypeEvent = form2Watch("landType");
  const waterTypeEvent = form2Watch("waterType");
  const farmerTypeEvent = form2Watch("farmerType");
  const groupMemberEvent = form2Watch("groupMember");
  if (
    qualificationEvent &&
    villageEvent &&
    postalNoEvent &&
    addressEvent &&
    talukEvent &&
    districtEvent &&
    landTypeEvent &&
    waterTypeEvent &&
    farmerTypeEvent &&
    groupMemberEvent
  ) {
    form2EnableButton = false;
  }

  let form3EnableButton = true;
  const nameAsPerBank = form3Watch("nameAsPerBank");
  const bankName = form3Watch("bankName");
  const accountNumber = form3Watch("accountNumber");
  const confirmAccountNumber = form3Watch("confirmAccountNumber");
  const ifscCode = form3Watch("ifscCode");
  if (
    (nameAsPerBank && bankName && accountNumber && confirmAccountNumber && ifscCode && accountNumber === confirmAccountNumber) ||
    !farmerBankDetail
  ) {
    form3EnableButton = false;
  }

  useEffect(() => {
    if (editMode) {
      setSelectedKey([farmersDetailsById[id].representative.id]);
    }
  }, [editMode, id]);

  useEffect(() => {
    if (editMode) {
      let farmerData = Object.values(farmersDetailsById as { [id: string]: farmerDetail }).find((f) => String(f.id) === id) as farmerDetail;
      form1Reset({
        name: farmerData?.name,
        fatherName: farmerData?.fatherName,
        sex: farmerData?.sex.toLowerCase(),
        spouseName: farmerData?.spouseName,
        dob: dateFormat(farmerData?.dob),
        group: farmerData?.group,
        phoneNumber: farmerData?.phoneNumber.replace("+91", ""),
        addhaarNo: farmerData?.addhaarNo,
        ...farmerData?.surveyNo,
        ...farmerData?.acre,
        ...farmerData?.border,
        surveyNo: farmerData?.surveyNo,
        acre: farmerData?.acre,
        border: farmerData?.border,
        profile: decryptText(farmerData?.profile) || placeHolderImg,
        email: farmerData?.email,
        representative: {
          id: farmerData?.representative?.id,
          name: farmerData?.representative?.name,
          phoneNumber: farmerData?.representative?.phoneNumber,
          pk: farmerData?.representative?.pk,
        },
        hasNoWhatsapp: farmerData.hasNoWhatsapp,
      });

      form2Reset({
        qualification: farmerData?.qualification,
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

      form3Reset({
        nameAsPerBank: farmerData?.nameAsPerBank,
        bankName: farmerData?.bankName,
        accountNumber: decryptText(farmerData?.accountNumber as string),
        confirmAccountNumber: decryptText(farmerData?.accountNumber as string),
        ifscCode: farmerData?.ifscCode,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode, id]);

  const form1Submit = (data: IAddFarmersDetailsPage1Input) => {
    if (isPhoneExist) return;
    setForm1Data({
      acre: data.acre,
      addhaarNo: data.addhaarNo,
      surveyNo: data.surveyNo,
      border: data.border,
      dob: dateFormat(data.dob) as string,
      fatherName: data.fatherName,
      group: data.group,
      name: data.name,
      phoneNumber: data.phoneNumber,
      profile: data.profile,
      sex: data.sex,
      spouseName: data.spouseName,
      email: data.email,
      representative:
        isSuccess && Boolean(selectedKey.length)
          ? {
              id: farmersDetailsById[selectedKey[0]]?.id,
              name: farmersDetailsById[selectedKey[0]]?.name ?? "",
              phoneNumber: farmersDetailsById[selectedKey[0]]?.phoneNumber ?? "",
              pk: farmersDetailsById[selectedKey[0]]?.pk ?? "",
            }
          : { id: "", name: "", phoneNumber: "", pk: "" },
      hasNoWhatsapp: !selectedKey.length ? "false" : "true",
    });
    setPage(2);
  };
  const form2Submit = async (data: IAddFarmersDetailsPage2Input) => {
    setForm2Data(data);
    setPage(3);
  };

  const setId = (newId: string) => {
    // id: mdId ? mdId : editMode ? id : newId,
    switch (mdId || editMode || newId) {
      case mdId:
        return mdId;
      case editMode:
        return id;
      default:
        return newId;
    }
  };

  const form3Submit = async (data: IAddFarmersDetailsPage3Input) => {
    const profileBlob = await fetch(form1Data?.profile as string).then((res) => res.blob());
    const compressedBase64 = await imageCompressor(profileBlob);
    const encryptedBase64 = encryptText(compressedBase64);
    //Get Id
    const dataLength = isSuccess && Object.values(farmersDetailsById).length;
    const lastPageData: farmerDetail[] | false = isSuccess && Object.values(farmersDetailsById);
    const lastMembershipId = isSuccess && (lastPageData as farmerDetail[])[(dataLength as number) - 1]["membershipId"].split("-")[2];

    let newId = uuidv4();
    let newMemberId = isSuccess && parseInt(lastMembershipId as string) + 1;

    let editedData = {
      accountNumber: data.accountNumber,
      ifscCode: data.ifscCode,
      bankName: data.bankName,
      nameAsPerBank: data.nameAsPerBank,
    };

    let params = {
      ...form1Data,
      ...form2Data,
      ...editedData,
      profile: encryptedBase64,
      id: setId(newId),
      membershipId: id && editMode ? farmersDetailsById[id].membershipId : `NER-FPC-${newMemberId}`,
      farmerId: id,
      phoneNumber: `+91${form1Data?.phoneNumber}`,
      landAreaInCent:
        Object.values(form1Data?.acre as IAddFarmersDetailsPage1Input).reduce((a, b) => {
          return a + parseInt(b as string);
        }, 0) * ACRETOCENT,

      accountNumber: encryptText(accountNumber),
    } as IAddFarmersDetailsPage1Input &
      IAddFarmersDetailsPage2Input &
      IAddFarmersDetailsPage3Input & { id: string; membershipId: string | undefined; farmerId?: string; landAreaInCent: number };
    cb({ ...params } as IAddFarmersDetailsFormInput & { id: string; membershipId: string; farmerId?: string });
    !editMode && handleClose();
  };

  return (
    <CustomModal openModal={openModal} handleClose={handleClose}>
      <ModalHeader handleClose={handleClose}>{editMode ? "Edit Farmer's Details" : "Add Farmer's Details"}</ModalHeader>

      {page === 2 ? (
        <>
          <ModalBody id={"farmersDetailsForm2"} onSubmit={form2HandleSubmit(form2Submit)}>
            <FormFieldPage2 control={form2Control as unknown as Control} />
          </ModalBody>
          <ModalFooter>
            <S.PageNumber>
              <S.CurrentPage>{page}/3</S.CurrentPage>
            </S.PageNumber>
            <S.ButtonContainer>
              <Button
                onClick={() => {
                  form2ClearErrors();
                  setPage(1);
                }}
              >
                Back
              </Button>
              <Button type="submit" form={"farmersDetailsForm2"} disabled={form2EnableButton}>
                Next
              </Button>
            </S.ButtonContainer>
          </ModalFooter>
        </>
      ) : page === 3 ? (
        <>
          <ModalBody id={"farmersDetailsForm3"} onSubmit={form3HandleSubmit(form3Submit)}>
            <FormFieldPage3 control={form3Control as unknown as Control} accntNo={accountNumber} />
          </ModalBody>
          <ModalFooter>
            <S.PageNumber>
              <S.CurrentPage>{page}/3</S.CurrentPage>
            </S.PageNumber>
            <S.ButtonContainer>
              <Button
                onClick={() => {
                  form3ClearErrors();
                  setPage(2);
                }}
              >
                Back
              </Button>
              <Button type="submit" form={"farmersDetailsForm3"} disabled={form3EnableButton}>
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
              watch={form1Watch}
              selectedKey={selectedKey}
              setSelectedKey={setSelectedKey}
              isPhoneExist={isPhoneExist}
              setIsPhoneExist={setIsPhoneExist}
            />
          </ModalBody>
          <ModalFooter>
            <S.PageNumber>
              <S.CurrentPage>{page}/3</S.CurrentPage>
            </S.PageNumber>
            <Button type="submit" form={"farmersDetailsForm1"} disabled={form1EnableButton}>
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

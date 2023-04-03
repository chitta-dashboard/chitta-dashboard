import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Compress from "react-image-file-resizer";
import { uploadProfile } from "../../services/s3-client";
import { useEdit } from "../../utils/hooks/query";
import Toast from "../../utils/toast";
import AdminLogo from "../../components/admin-panel/admin-logo";
import IdInformation from "../../components/admin-panel/id-information";
import ProfileInformation from "../../components/admin-panel/profile-information";
import { encryptText, ENDPOINTS, fileValidation } from "../../utils/constants";
import S from "./adminPanel.styled";

export interface AdminFormInputs {
  id?: string;
  profile?: any;
  name: string;
  address: string;
  coordinatorAddress: string;
  regNo: string;
  cinNo: string;
  membershipPrefix: string;
  folioPrefix: string;
  headerLogo?: string | null;
  pdfLogo?: string | null;
  certificateLogo?: string | null;
  loginLogo?: string | null;
}

const adminSchema = yup.object().shape({
  name: yup.string().required("required"),
  address: yup.string().required("required"),
  coordinatorAddress: yup.string().required("required"),
  regNo: yup.string().required("required"),
  cinNo: yup.string().required("required"),
  membershipPrefix: yup.string().required("required"),
  folioPrefix: yup.string().required("required"),
  profile: yup
    .mixed()
    .test("required", "required", (value) => {
      return value && value.length;
    })
    .test("formatTest", "expected format: .jpg, .jpeg, .png", (file) => {
      return fileValidation(file ? file[0]?.name : "");
    }),
});

const AdminPanel = () => {
  //state values
  const [logo, setLogo] = useState<File | null>();
  const [image, setImage] = useState<File | null>();
  // const [imageUrl, setImageUrl] = useState("");

  //constants
  const { mutate: updateAdminDetail } = useEdit(ENDPOINTS.admin);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<AdminFormInputs>({
    resolver: yupResolver(adminSchema),
  });

  // enabling submit button
  let enableButton = true;
  const addressEvent = watch("address");
  const cinNoEvent = watch("cinNo");
  const coordinatorAddressEvent = watch("coordinatorAddress");
  const folioPrefixEvent = watch("folioPrefix");
  const membershipPrefixEvent = watch("membershipPrefix");
  const nameEvent = watch("name");
  const regNoEvent = watch("regNo");
  const profileEvent = watch("profile");

  if (
    addressEvent &&
    cinNoEvent &&
    coordinatorAddressEvent &&
    folioPrefixEvent &&
    membershipPrefixEvent &&
    nameEvent &&
    regNoEvent &&
    profileEvent.length > 0
  ) {
    enableButton = false;
  }

  //functions
  const onSubmit = async (data: AdminFormInputs) => {
    const imgObj = data.profile[0];
    const profile = await uploadProfile(imgObj, "admin");

    const uploadData = {
      id: "admin_1",
      headerLogo: profile,
      loginLogo: profile,
      certificateLogo: profile,
      pdfLogo: profile,
      name: data.name,
      address: data.address,
      coordinatorAddress: data.coordinatorAddress,
      cinNo: data.cinNo,
      regNo: data.regNo,
      membershipPrefix: data.membershipPrefix,
      folioPrefix: data.folioPrefix,
    };

    updateAdminDetail({
      editedData: uploadData,
      successCb: () => {
        Toast({ message: "Admin updated successfully.", type: "success" });
        reset();
      },
      errorCb: () => {
        Toast({ message: "Request failed, please try again.", type: "error" });
      },
    });
    setLogo(null);
    setImage(null);
  };

  const fileChangedHandler = (file: File, width: number, height: number, name?: string) =>
    new Promise((resolve) => {
      Compress.imageFileResizer(
        file,
        width,
        height,
        "jpeg",
        100,
        0,
        (uri) => {
          resolve(encryptText(uri as string));
        },
        "base64",
      );
    });

  return (
    <S.MainContainer>
      <S.AdminText> Admin settings</S.AdminText>
      <S.ContainerBox>
        <S.Adminform id="adminForm" onSubmit={handleSubmit(onSubmit)}>
          <S.ContainerStack>
            <AdminLogo register={register} errors={errors} logo={logo} setLogo={setLogo} image={image} setImage={setImage} />
            <ProfileInformation register={register} errors={errors} />
            <IdInformation register={register} errors={errors} />
            <S.ButtonBox>
              <S.UpdateButton form="adminForm" type="submit" disabled={enableButton}>
                Update
              </S.UpdateButton>
            </S.ButtonBox>
          </S.ContainerStack>
        </S.Adminform>
      </S.ContainerBox>
    </S.MainContainer>
  );
};

export default AdminPanel;

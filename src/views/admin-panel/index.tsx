import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Resizer from "react-image-file-resizer";
import AdminLogo from "../../components/admin-panel/admin-logo";
import IdInformation from "../../components/admin-panel/id-information";
import ProfileInformation from "../../components/admin-panel/profile-information";
import { fileValidation } from "../../utils/constants";
import { useAuthContext } from "../../utils/context/auth";
import S from "./adminPanel.styled";

export interface adminFormInputs {
  id?: string;
  profile?: any;
  name: string;
  address: string;
  coordinatorAddress: string;
  regNo: string;
  cinNo: string;
  membershipPrefix: string;
  folioPrefix: string;
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
  const { addUpdate, addLogo } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<adminFormInputs>({
    resolver: yupResolver(adminSchema),
  });

  const fileChangedHandler = (file: File, width: number, height: number, name: string) => {
    var fileInput = false;
    if (file) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          file,
          width,
          height,
          "JPEG",
          100,
          0,
          (uri) => {
            localStorage.setItem(name, uri as string);
            addLogo();
          },
          "base64",
          94,
          94,
        );
      } catch (err) {
        // console.log(err);
      }
    }
  };

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

  const onSubmit = (data: adminFormInputs) => {
    localStorage.setItem("title", data.name);
    localStorage.setItem("cinNo", data.cinNo);
    localStorage.setItem("regNo", data.regNo);
    localStorage.setItem("address", data.address);

    const imgObj = data.profile[0];
    fileChangedHandler(imgObj, 94, 94, "headerLogo");
    fileChangedHandler(imgObj, 156, 156, "loginLogo");
    fileChangedHandler(imgObj, 180, 180, "certificateLogo");
    fileChangedHandler(imgObj, 180, 180, "pdfLogo");
    addUpdate({
      id: "100",
      profile: data.profile,
      address: data.address,
      cinNo: data.cinNo,
      coordinatorAddress: data.coordinatorAddress,
      folioPrefix: data.coordinatorAddress,
      membershipPrefix: data.membershipPrefix,
      name: data.name,
      regNo: data.regNo,
    } as adminFormInputs & { id: string });
    reset();
  };

  return (
    <S.MainContainer>
      <S.AdminText> Admin settings</S.AdminText>
      <S.ContainerBox>
        <S.Adminform id="adminForm" onSubmit={handleSubmit(onSubmit)}>
          <S.ContainerStack>
            <AdminLogo register={register}/>
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

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AdminLogo from "../../components/admin-panel/admin-logo";
import IdInformation from "../../components/admin-panel/id-information";
import ProfileInformation from "../../components/admin-panel/profile-information";
import S from "./adminPanel.styled";

export interface adminFormInputs {
  name: string;
  address: string;
  coordinatorAddress: string;
  regNo: string;
  cinNo: string;
  membershipPrefix: string;
  folioPrefix: string;
}

const adminSchema = yup.object().shape({
  name: yup.string().required("required !"),
  address: yup.string().required("required !"),
  coordinatorAddress: yup.string().required("required !"),
  regNo: yup.string().required("required !"),
  cinNo: yup.string().required("required !"),
  membershipPrefix: yup.string().required("required !"),
  folioPrefix: yup.string().required("required !"),
});

const AdminPanel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<adminFormInputs>({
    resolver: yupResolver(adminSchema),
  });

  const onSubmit = (data: adminFormInputs) => {
    reset();
  };

  return (
    <S.MainContainer>
      <S.AdminText> Admin settings</S.AdminText>
      <S.ContainerBox>
        <S.Adminform id="adminForm" onSubmit={handleSubmit(onSubmit)}>
          <S.ContainerStack>
            <AdminLogo />
            <ProfileInformation register={register} errors={errors} />
            <IdInformation register={register} errors={errors} />
            <S.ButtonBox>
              <S.UpdateButton form="adminForm" type="submit">
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

import { FC, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import S from "./passwordModal.styled";
import { Button } from "@mui/material";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  cb: (data: string) => void;
}

interface PasswordInputs {
  loginPassword: string;
}

const PasswordModal: FC<CustomProps> = (props) => {
  //constants
  const { openModal, handleClose, cb } = props;
  const userAuth: PasswordInputs = { loginPassword: "nerkathir" };

  const LoginSchema = yup.object().shape({
    loginPassword: yup.string().required("Password is required !"),
  });

  //state values
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<PasswordInputs>({
    resolver: yupResolver(LoginSchema),
    criteriaMode: "all",
  });

  //functions
  const onPasswordConfirmation = (userData: PasswordInputs) => {
    if (userData.loginPassword !== userAuth.loginPassword) {
      setError("loginPassword", {
        type: "custom",
        message: "Password mismatch !",
      });
      return;
    }
    reset();
    cb(userData.loginPassword);
  };

  const handleClickShowHidePassword = () => setShowPassword(!showPassword);

  return (
    <>
      <CustomModal openModal={openModal} handleClose={handleClose}>
        <ModalHeader
          handleClose={handleClose}
          //   alignment="warning"
        >
          Password Confirmation
        </ModalHeader>

        <ModalBody id={"passwordConfirmation"} onSubmit={handleSubmit(onPasswordConfirmation)}>
          <S.PasswordModalBody>
            <S.InputBox>
              <S.LoginFormLabel>Password</S.LoginFormLabel>
              <S.LoginInput
                type={showPassword === false ? "password" : "text"}
                placeholder="Enter Password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <S.Icon>lock</S.Icon>
                    </InputAdornment>
                  ),

                  endAdornment: (
                    <InputAdornment sx={{ cursor: "pointer" }} onClick={handleClickShowHidePassword} position="end">
                      {showPassword === false ? <S.EyeIcon>show</S.EyeIcon> : <S.EyeIcon>hide</S.EyeIcon>}
                    </InputAdornment>
                  ),
                }}
                {...register("loginPassword")}
                helperText={errors.loginPassword && errors.loginPassword.message}
                autoComplete="off"
              />
            </S.InputBox>
          </S.PasswordModalBody>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" form={"passwordConfirmation"} disabled={false}>
            Submit
          </Button>
        </ModalFooter>
      </CustomModal>
    </>
  );
};

export default PasswordModal;

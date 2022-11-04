import { useState, useRef, useEffect, FC } from "react";
import Resizer from "react-image-file-resizer";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import {  UseFormRegister } from "react-hook-form";
import { FieldErrorsImpl } from "react-hook-form";
import { adminFormInputs } from "../../../views/admin-panel";
import DummyLogo94 from "../../../assets/images/DummyLogo94.svg";
import DummyLogo156 from "../../../assets/images/DummyLogo156.svg";
import DummyLogo180 from "../../../assets/images/DummyLogo180.svg";
import S from "./adminLogo.styled";

interface CustomProps {
  file?: File;
  width: number;
  height: number;
  placeholder: string;
  color?: boolean;
}

interface LogoProps {
  register: UseFormRegister<adminFormInputs>;
  errors?: FieldErrorsImpl<adminFormInputs>;
}

export const ReactImageFileResizer: FC<CustomProps> = ({ file, width, height, placeholder, color }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (file && image) {
      Resizer.imageFileResizer(
        file,
        width,
        height,
        "PNG",
        100,
        0,
        (result) => {
          const blob = result as Blob;
          image.src = URL.createObjectURL(blob);
        },
        "blob",
      );
    }
  }, [file, height, width]);

  return <S.logoImage isColor={!!color} src={placeholder} alt="my-img" ref={imageRef} />;
};

const AdminLogo: FC<LogoProps> = ({ register, errors }) => {
  const [logo, setlogo] = useState<File>();
  const [image, setImage] = useState<File>();
  useEffect(() => {
    if (image) {
      if (image.type === "image/png" || image.type === "image/jpeg") {
        setlogo(image);
      } else {
        setlogo(undefined);
      }
    }
  }, [image]);

  return (
    <S.ContainerStack>
      <S.LogoText>Logo</S.LogoText>
      <S.UploadStack>
        <Box>
          <Button component="label">
            Upload
            <input
              {...register("profile", {
                onChange: (e) => {
                  setImage(e.target.files?.[0]);
                },
              })}
              hidden
              type="file"
            />
          </Button>
        </Box>
        <S.LogoStack>
          <Box>
            <ReactImageFileResizer placeholder={DummyLogo94} file={logo} width={94} height={94} />
          </Box>
          <Box>
            <ReactImageFileResizer placeholder={DummyLogo156} file={logo} width={156} height={156} />
          </Box>
          <Box>
            <ReactImageFileResizer color={true} placeholder={DummyLogo180} file={logo} width={180} height={180} />
          </Box>
          <Box>
            <ReactImageFileResizer placeholder={DummyLogo180} file={logo} width={180} height={180} />
          </Box>
        </S.LogoStack>
      </S.UploadStack>
      {errors && errors.profile && <S.ErrorText>{errors.profile?.message as string}</S.ErrorText>}
    </S.ContainerStack>
  );
};

export default AdminLogo;

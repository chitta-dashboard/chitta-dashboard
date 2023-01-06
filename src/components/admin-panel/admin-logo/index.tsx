import { useRef, useEffect, FC, SetStateAction, Dispatch } from "react";
import { UseFormRegister, FieldErrorsImpl } from "react-hook-form";
import Resizer from "react-image-file-resizer";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import S from "./adminLogo.styled";
import DummyLogo94 from "../../../assets/images/DummyLogo94.svg";
import DummyLogo156 from "../../../assets/images/DummyLogo156.svg";
import DummyLogo180 from "../../../assets/images/DummyLogo180.svg";
import { AdminFormInputs } from "../../../views/admin-panel";

interface CustomProps {
  file?: File | null;
  width: number;
  height: number;
  placeholder: string;
  color?: boolean;
}

type TLogo = File | undefined | null;
type TSetLogo = Dispatch<SetStateAction<File | undefined | null>>;
type TImage = File | undefined | null;
type TSetImage = Dispatch<SetStateAction<File | undefined | null>>;

interface LogoProps {
  register: UseFormRegister<AdminFormInputs>;
  errors?: FieldErrorsImpl<AdminFormInputs>;
  logo: TLogo;
  setLogo: TSetLogo;
  image: TImage;
  setImage: TSetImage;
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

  if (file === null) {
    const image = imageRef.current;
    if (image != null) {
      image.src = placeholder;
    }
  }

  return <S.logoImage iscolor={!!color} src={placeholder} alt="my-img" ref={imageRef} />;
};

const AdminLogo: FC<LogoProps> = ({ register, errors, logo, setLogo, image, setImage }) => {
  useEffect(() => {
    if (image) {
      if (image.type === "image/png" || image.type === "image/jpeg") {
        setLogo(image);
      } else {
        setLogo(null);
      }
    }
  }, [image, setLogo]);

  useEffect(() => {}, [register]);

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

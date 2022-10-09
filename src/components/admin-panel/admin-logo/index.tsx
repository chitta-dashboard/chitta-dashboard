import React, { useState, useRef, useEffect, FC } from "react";
import Resizer from "react-image-file-resizer";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import S from "./adminLogo.styled";
import DummyLogo94 from "../../../assets/images/DummyLogo94.svg";
import DummyLogo156 from "../../../assets/images/DummyLogo156.svg";
import DummyLogo180 from "../../../assets/images/DummyLogo180.svg";

interface CustomProps {
  file?: File;
  width: number;
  height: number;
  placeholder: string;
  color?: boolean;
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

const AdminLogo = () => {
  const [file, setFile] = useState<File>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        if (file.type === "image/png" || file.type === "image/jpeg") {
          setFile(file);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.ContainerStack>
      <S.LogoText>Logo</S.LogoText>
      <S.UploadStack>
        <Box>
          <Button component="label">
            Upload
            <input onChange={onChange} hidden multiple type="file" />
          </Button>
        </Box>
        <S.LogoStack>
          <Box>
            <ReactImageFileResizer placeholder={DummyLogo94} file={file} width={94} height={94} />
          </Box>
          <Box>
            <ReactImageFileResizer placeholder={DummyLogo156} file={file} width={156} height={156} />
          </Box>
          <Box>
            <ReactImageFileResizer color={true} placeholder={DummyLogo180} file={file} width={180} height={180} />
          </Box>
          <Box>
            <ReactImageFileResizer placeholder={DummyLogo180} file={file} width={180} height={180} />
          </Box>
        </S.LogoStack>
      </S.UploadStack>
    </S.ContainerStack>
  );
};

export default AdminLogo;

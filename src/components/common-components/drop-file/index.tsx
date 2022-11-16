import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import { FileDownload } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Toast from "../../../utils/toast";
import { BufferLoader } from "../../api-loader";
import S from "./dropFile.styled";

export interface IDropValidationResult {
  status: boolean;
  message: string;
}
interface IDropFile {
  fileFormat?: string[];
  fileExtension?: string[];
  cb: (file: File) => void;
  validate?: (file: File) => Promise<IDropValidationResult>;
}

export type DropTargetState = "noDrag" | "validDrag" | "inValidDrag" | "completedDrag" | "processingDrag";

function stopDefaultBehaviour(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
  e.stopPropagation();
}

const DropFile: React.FC<IDropFile> = function ({
  fileFormat = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"],
  fileExtension = [".xlsx", "xls"],
  validate,
  cb,
}) {
  const [targetState, setTargetState] = useState<DropTargetState>("noDrag");
  const [processingFile, setProcessingFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      stopDefaultBehaviour(e);
      // validates file format
      if (targetState !== "completedDrag") {
        const isValid = fileFormat.includes(e.dataTransfer.items[0]?.type);
        setTargetState(isValid ? "validDrag" : "inValidDrag");
      }
    },
    [targetState, fileFormat],
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      stopDefaultBehaviour(e);
      if (targetState !== "completedDrag") setTargetState("noDrag");
    },
    [targetState],
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      stopDefaultBehaviour(e);
      if (targetState === "inValidDrag") {
        setTargetState("noDrag");
        Toast({ message: "Invalid file format!", type: "error" });
      } else if (targetState === "validDrag") {
        setProcessingFile(true);
        const file = e.dataTransfer.files[0];
        const validation = validate ? await validate(file) : { status: true, message: "" };
        setProcessingFile(false);
        if (validation.status) {
          // if validation passed
          setTargetState("completedDrag");
          setSelectedFile(file);
          cb(file);
        } else {
          // if validation failed
          setTargetState("noDrag");
          Toast({ message: validation.message, type: "error" });
        }
      }
    },
    [targetState, validate, cb],
  );

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (targetState === "noDrag") e.currentTarget.querySelector("input")!.click();
    },
    [targetState],
  );

  const validateAndSet = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0];
      if (file) {
        setProcessingFile(true);
        const validation = validate ? await validate(file) : { status: true, message: "" };
        setProcessingFile(false);
        if (validation.status) {
          setTargetState("completedDrag");
          setSelectedFile(file);
          cb(file);
        } else {
          Toast({ message: validation.message, type: "error" });
        }
        e.target?.value && (e.target.value = ""); // if not cleared, rechoosing the same file wouldn't trigger the 'change' event. That is not good ux.
      }
    },
    [validate, cb],
  );

  return (
    <S.DropBox
      state={targetState}
      onDrag={stopDefaultBehaviour}
      onDragStart={stopDefaultBehaviour}
      onDragEnd={stopDefaultBehaviour}
      onDragOver={stopDefaultBehaviour}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <S.HiddenInput accept={fileExtension.join(",")} onChange={validateAndSet} />
      <S.Message>
        {(() => {
          if (processingFile) return <BufferLoader loaderText="Processing" />;
          else if (targetState === "noDrag" || targetState === "validDrag")
            return (
              <>
                <FileDownload sx={{ fontSize: "2rem", opacity: ".5" }} />
                <Typography>Click or Drag and drop to add 'Excel' file.</Typography>
              </>
            );
          else if (targetState === "inValidDrag") return <Typography>Invalid File Format!</Typography>;
          else return <Typography>{selectedFile?.name}</Typography>;
        })()}
      </S.Message>
    </S.DropBox>
  );
};

export default DropFile;

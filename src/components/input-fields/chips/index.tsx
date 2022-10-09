import { FieldValues } from "react-hook-form";
import S from "./chips.styled";

interface CustomProps<FormInputType extends FieldValues> {
  label: string;
  handleClose: () => void;
  multiSelectKey: string;
  inputName: String;
}
function Chips<FormInputTypes>({ label, handleClose, multiSelectKey }: CustomProps<FormInputTypes & FieldValues>) {
  return (
    <>
      <S.ChipContainer direction={"row"} spacing={1}>
        <S.StyledChip label={label && label} variant="outlined" onDelete={handleClose} size="small" key={multiSelectKey} />
      </S.ChipContainer>
    </>
  );
}

export default Chips;

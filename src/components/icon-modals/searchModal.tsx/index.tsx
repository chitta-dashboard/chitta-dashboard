import { InputAdornment } from "@mui/material";
import CommonIconModal from "../../common-icon-modal";
import CommonModalProps from "../../common-icon-modal/type/commonModalProps";
import S from "../iconModals.styled";

const SearchModal = (props: CommonModalProps) => {
  return (
    <CommonIconModal open={props.open} handleClose={props.handleClose}>
      <S.SearchField
        placeholder="search..."
        type="text"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <S.SearchIcon>search</S.SearchIcon>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment onClick={props.handleClose} position="start">
              <S.closeIcon>close</S.closeIcon>
            </InputAdornment>
          ),
        }}
      />
    </CommonIconModal>
  );
};

export default SearchModal;

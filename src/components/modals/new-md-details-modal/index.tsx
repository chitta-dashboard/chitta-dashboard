import { Stack } from "@mui/material";
import { FC, useState, useEffect } from "react";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import { useMdDetailsContext } from "../../../utils/context/mdDetails";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import ConfirmationModal from "../confirmation-modal";
import TableData from "./body/tableData";
import { searchWord } from "../../../utils/constants";
import SearchBar from "../../common-components/search-bar";
import S from "./index.styled";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  handleConfirmModal: () => void;
}

const MdDetailsModal: FC<CustomProps> = ({ openModal, handleClose, handleConfirmModal }) => {
  let { mdDetailsById } = useMdDetailsContext();
  const [mdDetailsByIdData, setmdDetailsByIdData] = useState(Object.values(mdDetailsById));
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");
  // let mdDetailsByIdData = Object.values(mdDetailsById);
  useEffect(() => {
    var reg = new RegExp("^[0-9]+$");

    let data = Object.values(mdDetailsById).filter((item) => {
      let search = reg.test(searchKeyWord) ? item.phoneNumber : item.name;
      return searchWord(search, searchKeyWord);
    });
    setmdDetailsByIdData(data);
    // mdDetailsByIdData = data
    // console.log("mdDetailsByIdData : ",mdDetailsByIdData)
  }, [searchKeyWord]);

  return (
    <CustomModal
      openModal={openModal}
      handleClose={() => {
        handleClose();
      }}
    >
      <ModalHeader
        handleClose={() => {
          handleClose();
        }}
      >
        Add MD Details
      </ModalHeader>
      <ModalBody id="mdDetails" isPadding={false}>
        <Stack spacing={0}>
          <SearchBar setSearchKeyWord={setSearchKeyWord} />
          <TableData mdListData={mdDetailsByIdData} />
        </Stack>
      </ModalBody>
      <ModalFooter>
        {" "}
        <S.AddButton onClick={handleConfirmModal}>Add</S.AddButton>
      </ModalFooter>
    </CustomModal>
  );
};

export default MdDetailsModal;

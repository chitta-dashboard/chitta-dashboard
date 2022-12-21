import { Stack } from "@mui/material";
import { FC, useState, useEffect } from "react";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import TableData from "./body/tableData";
import { farmerDetail } from "../../../utils/context/farmersDetails";
import { searchWord } from "../../../utils/constants";
import SearchBar from "../../common-components/search-bar";
import S from "./index.styled";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  handleConfirmModal: () => void;
  handleCheckBox: (id: string) => void;
  handleCheckBoxAll: () => void;
  selectedFarmerKeys: string[];
  farmerDetails: farmerDetail[];
}

const MdDetailsModal: FC<CustomProps> = (props) => {
  const { openModal, handleClose, handleConfirmModal, handleCheckBox, handleCheckBoxAll, selectedFarmerKeys, farmerDetails } = props;
  const [farmerDetailsByIdData, setFarmerDetailsByIdData] = useState(farmerDetails);
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");

  useEffect(() => {
    var reg = new RegExp("^[/d]+$");

    let filteredFarmerData = farmerDetails.filter((item) => {
      let search = reg.test(searchKeyWord) ? item.phoneNumber : item.name;
      return searchWord(search, searchKeyWord);
    });
    setFarmerDetailsByIdData(filteredFarmerData);
  }, [searchKeyWord]);

  useEffect(() => {
    setFarmerDetailsByIdData(farmerDetails);
  }, [farmerDetails]);

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
          <S.SearchBarContainer>
            <SearchBar searchHandler={(searchText) => setSearchKeyWord(searchText)} />
          </S.SearchBarContainer>
          <S.TableBodyContainer isDataAvailable={farmerDetailsByIdData.length > 0 ? true : false}>
            {farmerDetailsByIdData.length > 0 ? (
              <TableData
                farmerDetails={farmerDetailsByIdData}
                handleCheckBox={handleCheckBox}
                handleCheckBoxAll={handleCheckBoxAll}
                selectedFarmerKeys={selectedFarmerKeys}
              />
            ) : (
              <S.NoDataAvailable>No Md Details Available</S.NoDataAvailable>
            )}
          </S.TableBodyContainer>
        </Stack>
      </ModalBody>
      <ModalFooter>
        {farmerDetailsByIdData.length > 0 && (
          <S.AddButtonContainer>
            <S.AddButton onClick={handleConfirmModal} disabled={selectedFarmerKeys.length > 0 ? false : true}>
              Add
            </S.AddButton>
          </S.AddButtonContainer>
        )}
      </ModalFooter>
    </CustomModal>
  );
};

export default MdDetailsModal;

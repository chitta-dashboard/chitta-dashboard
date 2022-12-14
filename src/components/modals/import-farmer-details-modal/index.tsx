import { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import ModalHeader from "../../custom-modal/header";
import CustomModal from "../../custom-modal";
import ModalBody from "../../custom-modal/body";
import Toast from "../../../utils/toast";
import { useAdd, useFetchByPage } from "../../../utils/hooks/query";
import { ENDPOINTS } from "../../../utils/constants";
import { useAuthContext } from "../../../utils/context/auth";
import S from "./importFarmerDetailsModal.styled";
import { useFarmerDetailsContext } from "../../../utils/context/farmersDetails";
import { setPageCount } from "../../../utils/store/slice/farmerDetails";

interface Props {
  openModal: boolean;
  handleClose: () => void;
  count?: number;
  farmerDetailsData: Object[] | undefined;
}

const ImportFarmerDetailsModal: FC<Props> = ({ openModal, handleClose, count, farmerDetailsData }) => {
  const { mutate: addFarmerDetails } = useAdd(ENDPOINTS.farmerDetails);
  const { addNotification } = useAuthContext();
  const { currentPage, farmerQuery, totalPageCount } = useFarmerDetailsContext();

  const {
    formatChangeSuccess: isFarmerByPageSuccess,
    result: { refetch: farmerDetailsRefetch },
    dataCount: totalDataCount,
  } = useFetchByPage(ENDPOINTS.farmerDetails, currentPage, farmerQuery, 25, false);

  console.log("totalPageCount", totalPageCount);

  const yesButtonHandler = () => {
    farmerDetailsData &&
      addFarmerDetails({
        data: farmerDetailsData,
        successCb: () => {
          addNotification({ id: uuidv4(), message: `New ${count} farmers created.` });
          Toast({ type: "success", message: `All ${count} farmers created successfully` });
          farmerDetailsRefetch().then((res) => {
            //console.log("Result : ", res.isFetched);
            res.isFetched && setPageCount({ pageCount: Math.ceil(totalDataCount / 25), totalPageCount: totalDataCount });
          });
          handleClose();
        },
        errorCb: () => {
          Toast({ type: "error", message: `error occured! please retry!` });
        },
      });
  };

  return (
    <CustomModal openModal={openModal}>
      <ModalHeader handleClose={handleClose}>Add farmer details</ModalHeader>
      <ModalBody>Do you want to create all {count} farmers ?</ModalBody>
      <S.ButtonContainer>
        <S.NoButton onClick={handleClose}>No</S.NoButton>
        <S.YesButton onClick={yesButtonHandler}>Yes</S.YesButton>
      </S.ButtonContainer>
    </CustomModal>
  );
};

export default ImportFarmerDetailsModal;

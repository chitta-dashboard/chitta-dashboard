import { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import ModalHeader from "../../custom-modal/header";
import CustomModal from "../../custom-modal";
import Toast from "../../../utils/toast";
import { useAdd, useFetch } from "../../../utils/hooks/query";
import { ENDPOINTS } from "../../../utils/constants";
import { useAuthContext } from "../../../utils/context/auth";
import { farmerDetail } from "../../../utils/context/farmersDetails";
import ConfirmationBody from "../confirmation-modal/body";
import S from "./importFarmerDetailsModal.styled";
import YesOrNoButtons from "../../buttons/yes-or-no-buttons";

interface Props {
  openModal: boolean;
  handleClose: () => void;
  count?: number;
  farmerDetailsData: Object[] | undefined;
  handleCloseImport: () => void;
}

const ImportFarmerDetailsModal: FC<Props> = ({ openModal, handleClose, count, farmerDetailsData, handleCloseImport }) => {
  const {
    formatChangeSuccess: isSuccess,
    result: { data: farmersDetailsById },
  } = useFetch(ENDPOINTS.farmerDetails);
  const { mutate: addFarmerDetails } = useAdd(ENDPOINTS.farmerDetails);
  const { addNotification } = useAuthContext();

  const LastFarmerMember: farmerDetail | false =
    isSuccess && (Object.values(farmersDetailsById)[Object.values(farmersDetailsById).length - 1] as farmerDetail);
  const newMemberId: number = parseInt((LastFarmerMember as farmerDetail)?.membershipId.split("-")[2]);

  const yesButtonHandler = () => {
    if (farmerDetailsData) {
      const newfarmerData = farmerDetailsData.map((item, i) => {
        return { ...item, membershipId: `NER-FPC-${newMemberId + i + 1}` };
      });
      addFarmerDetails({
        data: newfarmerData,
        successCb: () => {
          addNotification({ id: uuidv4(), message: `New ${count} farmers created.` });
          Toast({ type: "success", message: `All ${count} farmers created successfully` });
          handleClose();
          handleCloseImport();
        },
        errorCb: () => {
          Toast({ type: "error", message: `error occured! please retry!` });
        },
      });
    }
  };

  return (
    <CustomModal openModal={openModal}>
      <ModalHeader handleClose={handleClose} alignment={"center"}>
        Confirmation
      </ModalHeader>
      <S.Container>
        <ConfirmationBody
          confirmMessage={
            <>
              <S.DialogueText>
                Do you want to create all <S.Highlite>{count} </S.Highlite>farmers ?
              </S.DialogueText>
            </>
          }
        ></ConfirmationBody>
        <YesOrNoButtons
          handleClose={() => {
            handleCloseImport();
            handleClose();
          }}
          yesAction={yesButtonHandler}
        />
      </S.Container>
    </CustomModal>
  );
};

export default ImportFarmerDetailsModal;

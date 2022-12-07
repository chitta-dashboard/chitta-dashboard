import { FC, useState } from "react";
import { v4 as uuid } from "uuid";
import { ENDPOINTS } from "../../../utils/constants";
import { useAuthContext } from "../../../utils/context/auth";
import { farmerDetail } from "../../../utils/context/farmersDetails";
import { useAdd } from "../../../utils/hooks/query";
import Toast from "../../../utils/toast";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import YesOrNoButtons from "../../buttons/yes-or-no-buttons";
import ImportFarmerDetailsModal from "../import-farmer-details-modal";
import S from "./importFarmerGroupModal.styled";

interface Props {
  openModal: boolean;
  handleClose: () => void;
  groups?: string[] | undefined;
  data?: farmerDetail[];
  handleCloseImport: () => void;
}

const ImportFarmerGroupModal: FC<Props> = ({ openModal, handleClose, groups, data, handleCloseImport }) => {
  const { mutate: addFarmerGroup } = useAdd(ENDPOINTS.farmerGroup);
  const { addNotification } = useAuthContext();
  const [farmerDatas, setFarmerDatas] = useState<Object[]>();
  const [createFarmers, setCreateFarmers] = useState<boolean>(false);

  const yesButtonHandler = () => {
    if (data) {
      let newId: string;
      let farmer: Object;
      let farmerGroup: Object;
      let newFarmerDetailsDatas: Object[] = [];
      let newFarmerGroupDatas: Object[] = [];

      // creating the new datas for farmerdDetails & farmerGroup
      // eslint-disable-next-line array-callback-return
      data?.map((i: farmerDetail) => {
        let id = uuid();
        newId = id;

        // creating farmerDetails db structure
        farmer = {
          ...i,
          id: newId,
          profile: "",
        };

        // creating farmerGroup db structure
        farmerGroup = { id: uuid(), groupName: i.group, explanation: "", chairman: "", treasurer: "", secretary: "", members: [newId] };
        newFarmerDetailsDatas.push(farmer);
        newFarmerGroupDatas.push(farmerGroup);
      });

      setFarmerDatas(newFarmerDetailsDatas);
      // mutating farmerGroup while bulk import
      addFarmerGroup({
        data: newFarmerGroupDatas,
        successCb: () => {
          addNotification({ id: uuid(), message: "New farmer group created" });
          Toast({ message: `All ${newFarmerGroupDatas.length} groups created Successfully`, type: "success" });
          setCreateFarmers(true); // for open the import farmerDetails modal
          handleClose();
        },
        errorCb: () => {
          Toast({ message: "Request failed! Please try again", type: "error" });
        },
      });
    }
  };

  return (
    <>
      <CustomModal openModal={openModal}>
        <ModalHeader handleClose={handleClose} alignment={"center"}>
          Confirmation
        </ModalHeader>
        <ModalBody>
          <S.Contents>
            <S.DialogueText>Do you want to create the following farmer groups ?</S.DialogueText>
            <S.ChipContainer>
              {groups && groups.length > 0 ? groups?.map((i, index) => <S.Chips label={i} key={index} />) : "No new groups"}
            </S.ChipContainer>
            <S.ButtonContainer>
              <YesOrNoButtons
                yesAction={yesButtonHandler}
                handleClose={() => {
                  if (groups && groups.length > 0) {
                    handleCloseImport();
                    handleClose();
                  } else {
                    setCreateFarmers(true);
                  }
                }}
              />
            </S.ButtonContainer>
          </S.Contents>
        </ModalBody>
      </CustomModal>
      <ImportFarmerDetailsModal
        handleClose={() => setCreateFarmers(!createFarmers)}
        farmerDetailsData={farmerDatas && farmerDatas} // for mutate the farmer details db
        openModal={createFarmers}
        count={farmerDatas && farmerDatas.length} // for toast message
        handleCloseImport={handleCloseImport}
      />
    </>
  );
};

export default ImportFarmerGroupModal;

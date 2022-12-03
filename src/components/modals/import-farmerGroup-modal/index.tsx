import { FC, useState } from "react";
import { v4 as uuid } from "uuid";
import ImportFarmerDetailsModal from "../import-farmer-details-modal";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import Toast from "../../../utils/toast";
import { useAdd } from "../../../utils/hooks/query";
import { ENDPOINTS, groupBy } from "../../../utils/constants";
import { farmerDetail } from "../../../utils/context/farmersDetails";
import { useAuthContext } from "../../../utils/context/auth";
import S from "./importFarmerGroupModal.styled";

interface Props {
  openModal: boolean;
  handleClose: () => void;
  groups?: string[] | undefined;
  data?: farmerDetail[];
}

const ImportFarmerGroupModal: FC<Props> = ({ openModal, handleClose, groups, data }) => {
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
        <ModalHeader handleClose={handleClose}>New Groups</ModalHeader>
        <S.ConfirmationText>Do you want to create the following groups ?</S.ConfirmationText>
        <ModalBody>
          <S.Container>{groups && groups.length > 0 ? groups?.map((i, index) => <S.Chips label={i} key={index} />) : "No new groups"}</S.Container>
        </ModalBody>
        <S.ButtonContainer>
          <S.NoButton onClick={handleClose}>No</S.NoButton>
          <S.YesButton onClick={yesButtonHandler}>Yes</S.YesButton>
        </S.ButtonContainer>
      </CustomModal>
      <ImportFarmerDetailsModal
        handleClose={() => setCreateFarmers(!createFarmers)}
        farmerDetailsData={farmerDatas && farmerDatas} // for mutate the farmer details db
        openModal={createFarmers}
        count={farmerDatas && farmerDatas.length} // for toast message
      />
    </>
  );
};

export default ImportFarmerGroupModal;

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../../utils/constants";
import TablePageHeader from "../../components/common-table-page-header";
import AddMdDetailsModal from "../../components/modals/new-md-details-modal";
import ConfirmationModal from "../../components/modals/confirmation-modal";
import MdDetailsTable from "../../components/tables/md-details-table";
import { farmerDetail, useFarmerDetailsContext } from "../../utils/context/farmersDetails";
import { mdDetail, useMdDetailsContext } from "../../utils/context/mdDetails";
import { useAuthContext } from "../../utils/context/auth";
import S from "./mdDetails.styled";

const MdDetails = () => {
  const [addModal, setAddModal] = useState(false);
  const { mdDetailsById, setSearchFilter, sortFilter, setSortFilter, checkboxSelect } = useMdDetailsContext();
  const { farmersDetailsById } = useFarmerDetailsContext();
  const { addNotification } = useAuthContext();
  const [filteredFarmerDetails, setFilteredFarmerDetails] = useState<farmerDetail[]>([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  let farmerKeys = Object.keys(farmersDetailsById);

  useEffect(() => {
    Object.values(mdDetailsById).map((item): mdDetail | null => {
      if (farmerKeys.includes(item.farmerId as string)) {
        let index = farmerKeys.indexOf(item.farmerId as string);
        farmerKeys.splice(index, 1);
      }
      return null;
    });
    let filteredFarmerData: farmerDetail[] = [];
    farmerKeys.map((item) => {
      filteredFarmerData.push(farmersDetailsById[item]);
    });
    setFilteredFarmerDetails([...filteredFarmerData]);
  }, [mdDetailsById, farmersDetailsById]);

  const CustomMessage = () => {
    return (
      <S.CustomMessageDetails>
        Do you want to add{" "}
        {<S.CustomMessage>{selectedKeys.length === 1 ? farmersDetailsById[selectedKeys[0]].name : `${selectedKeys.length} farmers`}</S.CustomMessage>}{" "}
        on MD Details?
      </S.CustomMessageDetails>
    );
  };

  const handleCheckBoxSelectAll = () => {
    if (selectedKeys.length === filteredFarmerDetails.length) {
      setSelectedKeys([]);
    } else {
      let newFarmerKeys: string[] = [];
      filteredFarmerDetails.map((item) => {
        !selectedKeys.includes(item.id) && newFarmerKeys.push(item.id);
      });
      setSelectedKeys([...selectedKeys, ...newFarmerKeys]);
    }
  };

  const handleCheckBoxSelect = (value: string) => {
    if (selectedKeys.includes(value)) {
      let index = selectedKeys.indexOf(value);
      selectedKeys.splice(index, 1);
      setSelectedKeys([...selectedKeys]);
    } else {
      setSelectedKeys([...selectedKeys, value]);
    }
  };

  const handleYesAction = () => {
    let farmerData: { [id: string]: mdDetail } = {};
    selectedKeys.map((item: string) => {
      let generatedId = uuidv4();
      let farmerDetailsResult: mdDetail = {} as mdDetail;
      let farmerKeys = Object.keys(farmersDetailsById[item]);
      farmerDetailsResult.id = generatedId;
      farmerDetailsResult.farmerId = farmersDetailsById[item].id;
      farmerKeys.map((key) => {
        if (key !== "id") {
          farmerDetailsResult[key as keyof mdDetail] = farmersDetailsById[item][key as keyof farmerDetail] as never;
        }
      });
      farmerData[generatedId] = farmerDetailsResult;

      //Notification
      let notification = {
        id: generatedId,
        image: farmersDetailsById[item].profile,
        message: Message(farmersDetailsById[item].name).addMd,
      };
      addNotification(notification);
    });
    checkboxSelect(farmerData);
    setIsConfirmModalOpen(false);
    addModalHandler();
  };

  const handleNoAction = () => {
    setIsConfirmModalOpen(false);
  };

  const addModalHandler = () => {
    setAddModal(!addModal);
    setSelectedKeys([]);
  };

  const addButtonHandler = () => {
    setIsConfirmModalOpen(true);
  };

  return (
    <>
      <S.MdDetailsContainer>
        <TablePageHeader addModalHandler={addModalHandler} searchHandler={setSearchFilter} sortHandler={setSortFilter} sortFilter={sortFilter} />
        <MdDetailsTable />
      </S.MdDetailsContainer>
      <AddMdDetailsModal
        openModal={addModal}
        handleClose={addModalHandler}
        handleConfirmModal={addButtonHandler}
        handleCheckBox={handleCheckBoxSelect}
        handleCheckBoxAll={handleCheckBoxSelectAll}
        selectedFarmerKeys={selectedKeys}
        farmerDetails={filteredFarmerDetails}
      />
      <ConfirmationModal openModal={isConfirmModalOpen} confirmMessage={<CustomMessage />} handleClose={handleNoAction} yesAction={handleYesAction} />
    </>
  );
};

export default MdDetails;

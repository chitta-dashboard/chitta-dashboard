import React, { useState } from "react";
import TablePageHeader from "../../components/common-table-page-header";
import AddMdDetailsModal from "../../components/modals/new-md-details-modal";
import ConfirmationModal from "../../components/modals/confirmation-modal";
import MdDetailsTable from "../../components/tables/md-details-table";
import { farmerDetail, useFarmerDetailsContext } from "../../utils/context/farmersDetails";
import { mdDetail, useMdDetailsContext } from "../../utils/context/mdDetails";
import S from "./mdDetails.styled";

const MdDetails = () => {
  const [addModal, setAddModal] = useState(false);
  const { mdDetailsById,setSearchFilter, sortFilter, setSortFilter, checkboxSelect } = useMdDetailsContext();
  const { farmersDetailsById } = useFarmerDetailsContext();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const CustomMessage = () => {
    return (
      <S.CustomMessageDetails>
        Do you want to add{" "}
        {<S.CustomMessage>{selectedKeys.length === 1 ? farmersDetailsById[selectedKeys[0]].name : `${selectedKeys.length} farmers`}</S.CustomMessage>}{" "}
        on Md Details?
      </S.CustomMessageDetails>
    );
  };

  const handleCheckBoxSelectAll = () => {
    let keys = Object.keys(farmersDetailsById);
    if (selectedKeys.length === keys.length) {
      setSelectedKeys([]);
    } else {
      let newData: string[] = [];
      keys.map((id) => {
        !selectedKeys.includes(id) && newData.push(id);
      });
      setSelectedKeys([...selectedKeys, ...newData]);
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
    selectedKeys.map((item) => {
      let generatedId = Math.random().toString()
      let result:mdDetail = {} as mdDetail;
      // let farmerKeys = ["name", "phoneNumber", "qualification", "profile", "dob", "name"];
      result.id = generatedId;
      result.farmerId = farmersDetailsById[item].id;
      result.name = farmersDetailsById[item].name;
      result.phoneNumber = farmersDetailsById[item].phoneNumber;
      result.qualification = farmersDetailsById[item].education;
      result.profile = farmersDetailsById[item].profile as string;
      result.dob = farmersDetailsById[item].dob;
      result.name = farmersDetailsById[item].name;
      farmerData[generatedId] = result;
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
        farmerDetails={Object.values(farmersDetailsById)}
      />
      <ConfirmationModal openModal={isConfirmModalOpen} confirmMessage={<CustomMessage />} handleClose={handleNoAction} yesAction={handleYesAction} />
    </>
  );
};

export default MdDetails;

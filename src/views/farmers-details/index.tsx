import { useState } from "react";
import { FarmersGroup } from "../../utils/context/farmersGroup";
import { IMdDetails } from "../../utils/context/mdDetails";
import { useAuthContext } from "../../utils/context/auth";
import { useFarmerDetailsContext } from "../../utils/context/farmersDetails";
import { ENDPOINTS, Message } from "../../utils/constants";
import { useAdd, useEdit, useFetch } from "../../utils/hooks/query";
import Toast from "../../utils/toast";
import { IAddFarmersDetailsFormInput } from "../../components/modals/type/formInputs";
import FarmersDetailsTablePageHeader from "../../components/table-page-header/farmers-details-table-page-header";
import FarmersDetailsTable from "../../components/tables/farmers-details-table";
import PasswordModal from "../../components/modals/password-modal";
import AddFarmersDetailsModal from "../../components/modals/farmers-details-modal";
import Loader from "../../utils/loaders/tree-loader";
import S from "./farmersDetails.styled";
import { addCustomer } from "../../queries";

const FarmersDetails = () => {
  const { setSearchFilter, setFarmerBankDetail } = useFarmerDetailsContext();

  const {
    result: { data: farmersGroupById },
    formatChangeSuccess: isFarmerGroupSuccess,
  } = useFetch(ENDPOINTS.farmerGroup);

  const { mutate: editFarmerGroup } = useEdit(ENDPOINTS.farmerGroup);
  const { result } = useFetch(ENDPOINTS.farmerDetails);
  const { mutate } = useAdd(ENDPOINTS.farmerDetails);

  const { addNotification, loader } = useAuthContext();
  const [addModal, setAddModal] = useState(false);
  const [passwordConfirmModal, setPasswordConfirmModal] = useState(false);
  const [farmerData, setFarmerData] = useState<IMdDetails>();

  //Add Modal Handler
  const addModalHandler = () => {
    setAddModal(!addModal);
    setFarmerBankDetail(true);
  };

  const farmersGroupData = Object.values(isFarmerGroupSuccess && (farmersGroupById as FarmersGroup[]));
  const addGroupMember = (id: string, group: string) => {
    const groupIndex = farmersGroupData.findIndex((list) => list.groupName === group);
    const newGroupMember = farmersGroupData[groupIndex];
    newGroupMember.members.push(id);
    editFarmerGroup({ editedData: newGroupMember });
  };

  // Add Farmerdetail Handler before proceeding to password modal
  const addDataHandler = (data: IMdDetails) => {
    const newFarmer = { ...data };
    data && delete newFarmer.farmerId;
    setPasswordConfirmModal(true);
    setFarmerData(data);
  };

  // Add Farmerdetail Handler after entering correct password
  const addFarmerDetailHandler = (data: any) => {
    const newFarmer = { ...farmerData, password: data } as IAddFarmersDetailsFormInput;
    setPasswordConfirmModal(false);
    loader({ openLoader: true, loaderText: `Creating customer` });
    addCustomer(newFarmer).then((res) => {
      if (res) {
        newFarmer &&
          mutate({
            data: newFarmer,
            successCb: () => {
              addNotification({ id: newFarmer.id as string, image: newFarmer.profile, message: Message(newFarmer.name).addFarmDetail });
              Toast({ message: "Farmer Added Successfully", type: "success" });
            },
            errorCb: () => Toast({ message: "Request failed! Please try again", type: "error" }),
          });
        addGroupMember(data.id, data.group);
      }
    });
  };

  const handleSearchInput = (searchText: string) => {
    setSearchFilter(searchText);
  };

  return (
    <>
      {result.isFetching ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <S.FarmersDetailsContainer>
            <FarmersDetailsTablePageHeader addModalHandler={addModalHandler} searchHandler={handleSearchInput} />
            <FarmersDetailsTable />
          </S.FarmersDetailsContainer>
          <AddFarmersDetailsModal
            openModal={addModal}
            handleClose={() => {
              addModalHandler();
              setFarmerBankDetail(false);
            }}
            cb={addDataHandler}
          />
          <PasswordModal
            openModal={Boolean(passwordConfirmModal)}
            handleClose={() => {
              setPasswordConfirmModal(false);
            }}
            cb={addFarmerDetailHandler}
          />
        </>
      )}
    </>
  );
};

export default FarmersDetails;

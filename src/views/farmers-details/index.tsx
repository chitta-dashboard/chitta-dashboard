import { useState } from "react";
import { FarmersGroup } from "../../utils/context/farmersGroup";
import { IMdDetails } from "../../utils/context/mdDetails";
import { useAuthContext } from "../../utils/context/auth";
import { farmerDetail, useFarmerDetailsContext } from "../../utils/context/farmersDetails";
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
import { createWalletAndEncrypt } from "../../services/algorand";

const FarmersDetails = () => {
  //state values
  const { addNotification, loader } = useAuthContext();
  const { setSearchFilter, setFarmerBankDetail } = useFarmerDetailsContext();
  const [addModal, setAddModal] = useState(false);
  const [passwordConfirmModal, setPasswordConfirmModal] = useState(false);
  const [farmerData, setFarmerData] = useState<IMdDetails>();

  //constants
  const {
    result: { data: farmersGroupById },
    formatChangeSuccess: isFarmerGroupSuccess,
  } = useFetch(ENDPOINTS.farmerGroup);

  const {
    formatChangeSuccess: isMdDetailsSuccess,
    result: { data: mdDetailsById },
  } = useFetch(ENDPOINTS.mdDetails);

  const {
    formatChangeSuccess: isFarmerDetailsSuccess,
    result: { isFetching, data: farmersDetailsById },
  } = useFetch(ENDPOINTS.farmerDetails);

  const { mutate } = useAdd(ENDPOINTS.farmerDetails);
  const { mutate: editFarmerGroup } = useEdit(ENDPOINTS.farmerGroup);
  const { mutate: editFarmerDetail } = useEdit(ENDPOINTS.farmerDetails);
  const { mutate: editMdDetail } = useEdit(ENDPOINTS.mdDetails);

  //functions
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
  const addFarmerDetailHandler = (data: string) => {
    const newFarmer = { ...farmerData, password: data, representativeOf: [] } as farmerDetail;
    setPasswordConfirmModal(false);
    const newFarmerWithWallet = createWalletAndEncrypt([newFarmer]);
    if (newFarmerWithWallet.length) {
      delete newFarmerWithWallet[0].password;
      loader({ openLoader: true, loaderText: `Creating customer` });
      addCustomer(newFarmerWithWallet[0]).then((res) => {
        if (res) {
          const { id, group } = newFarmerWithWallet[0];
          mutate({
            data: newFarmerWithWallet[0] as IAddFarmersDetailsFormInput,
            successCb: () => {
              addNotification({ id: newFarmer.id as string, image: newFarmer.profile, message: Message(newFarmer.name).addFarmDetail });
              Toast({ message: "Farmer Added Successfully", type: "success" });
              if (newFarmer.representative.id) HandleRepresentativeOf(newFarmer, newFarmer.representative.id);
            },
            errorCb: () => Toast({ message: "Farmer creation failed! Please try again", type: "error" }),
          });
          addGroupMember(id, group);
        } else {
          Toast({ message: "Customer creation failed! Please try again", type: "error" });
          loader({ openLoader: false });
        }
      });
    } else Toast({ message: "Wallet creation failed! Please try again", type: "error" });
  };

  const HandleRepresentativeOf = (farmer: farmerDetail, repId: string) => {
    const toRepOf = {
      id: farmer.id,
      pk: farmer.PK,
      phoneNumber: farmer.phoneNumber,
      name: farmer.name,
    };
    const targetFarmer = farmersDetailsById[repId];
    targetFarmer.representativeOf.push(toRepOf);
    const targetMd = Object.values(isMdDetailsSuccess && (mdDetailsById as IMdDetails[])).find((md) => md.farmerId === repId);
    if (targetMd) targetMd.representativeOf.push(toRepOf);
    editFarmerDetail({
      editedData: targetFarmer,
      successCb: () => {
        !targetMd && Toast({ message: "Representative Updated Successfully.", type: "success" });
        if (targetMd) {
          editMdDetail({
            editedData: targetMd,
            successCb: () => Toast({ message: "Representative Updated Successfully.", type: "success" }),
            errorCb: () => Toast({ message: "Md updation request failed! Please try again", type: "error" }),
          });
        }
      },
      errorCb: () => Toast({ message: "Farmer updation request failed! Please try again", type: "error" }),
    });
  };

  const handleSearchInput = (searchText: string) => {
    setSearchFilter(searchText);
  };

  return (
    <>
      {isFetching ? (
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

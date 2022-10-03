import { Ref, useRef, useState } from "react";

import FarmersDetailsTablePageHeader from "../../components/table-page-header/farmers-details-table-page-header";
import FarmersDetailsTable from "../../components/tables/farmers-details-table";
import AddFarmersDetailsModal from "../../components/modals/farmers-details-modal";
import { useFarmerDetailsContext } from "../../utils/context/farmersDetails";
import { IAddFarmersDetailsFormInput } from "../../components/modals/type/formInputs";

import S from "./farmersDetails.styled";
import ShareAmountModal from "../../components/modals/share-amount-modal";
import { useReactToPrint } from "react-to-print";
import TamilShareHolderCertificate from "../tamil-share-certificate";

const FarmersDetails = () => {
  const [addModal, setAddModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const { addFarmerDetail, setSearchFilter, sortFilter, setSortFilter } = useFarmerDetailsContext();
  const pdftamilcertificate = useRef<HTMLDivElement>();

  //Add Modal Handler
  const addModalHandler = () => {
    setAddModal(!addModal);
  };
  //Share Amount Modal Handler
  const shareAmountModalHandler = () => {
    setShareModal(!shareModal);
  };
  // Add Farmerdetail Handler
  const addDataHandler = (data: IAddFarmersDetailsFormInput & { id: string; membershipId: string }) => {
    addFarmerDetail(data);
  };

  // to generate Tamil share holder certificate
  const generateTamilCertificatePDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => pdftamilcertificate.current as HTMLDivElement,
  });

  return (
    <>
      <S.InvisibleBox>
        <TamilShareHolderCertificate ref={pdftamilcertificate as Ref<HTMLDivElement> | undefined} />
      </S.InvisibleBox>
      <S.FarmersDetailsContainer>
        <FarmersDetailsTablePageHeader
          addModalHandler={addModalHandler}
          searchHandler={setSearchFilter}
          sortFilter={sortFilter}
          sortHandler={setSortFilter}
          shareAmountModalHandler={shareAmountModalHandler}
        />
        <FarmersDetailsTable />
      </S.FarmersDetailsContainer>
      <ShareAmountModal
        openModal={shareModal}
        handleClose={shareAmountModalHandler}
        generateTamilCertificate={() => {
          generateTamilCertificatePDF();
        }}
      />

      <AddFarmersDetailsModal openModal={addModal} handleClose={addModalHandler} cb={addDataHandler} />
    </>
  );
};

export default FarmersDetails;

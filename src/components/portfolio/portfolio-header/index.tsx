import { FC, useState } from "react";
import SearchBar from "../../common-components/search-bar";
import { Button } from "@mui/material";
import ToggleButton from "../../../utils/ToggleButton";
import ProductsModal from "../../modals/products-modal";
import { IAddProductsFormInput } from "../../modals/type/formInputs";
import { useAdd } from "../../../utils/hooks/query";
import { ENDPOINTS, Endpoints, Message } from "../../../utils/constants";
import { useAuthContext } from "../../../utils/context/auth";
import S from "./portfolioHeader.styled";
import Toast from "../../../utils/toast";

const PortfolioHeader: FC = () => {
  const [tab, setTab] = useState("Raw");
  const [addModalOpen, setAddModalOpen] = useState(false);

  const { mutate: porfolioAdd } = useAdd(ENDPOINTS.portfolioRaw as Endpoints);
  const { addNotification } = useAuthContext();

  const addDataHandler = (data: IAddProductsFormInput & { id: string }) => {
    porfolioAdd({
      data: data,
      successCb: () => {
        Toast({ message: "Product added successfully.", type: "success" });
      },
      errorCb: () => {
        Toast({ message: "Request failed, please try again.", type: "error" });
      },
    });
    addNotification({ id: data.id, image: data.profile, message: Message(data.name).addProduct });
  };

  return (
    <>
      <S.Header>
        <S.Description>
          <S.DescriptionHeader>Products</S.DescriptionHeader>
          <S.DescriptionText>Available farm products from farmers.</S.DescriptionText>
        </S.Description>
        <ToggleButton selectedMode={tab} setSelectedMode={setTab} options={["Raw", "Processed", "Animal"]} />
        <S.Action>
          <SearchBar />
          <Button onClick={() => setAddModalOpen(true)}>Add</Button>
        </S.Action>
      </S.Header>
      {addModalOpen && <ProductsModal openModal={true} handleClose={() => setAddModalOpen(false)} cb={addDataHandler} />}
    </>
  );
};

export default PortfolioHeader;

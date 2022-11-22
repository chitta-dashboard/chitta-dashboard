import { FC, useState } from "react";
import SearchBar from "../../common-components/search-bar";
import { Button } from "@mui/material";
import ToggleButton from "../../../utils/ToggleButton";
import ProductsModal from "../../modals/products-modal";
import { IAddProductsFormInput, IProductVarient } from "../../modals/type/formInputs";
import { useEditPortfolio } from "../../../utils/hooks/query";
import { ENDPOINTS, Message } from "../../../utils/constants";
import { useAuthContext } from "../../../utils/context/auth";
import S from "./portfolioHeader.styled";
import Toast from "../../../utils/toast";

const PortfolioHeader: FC = () => {
  const [tab, setTab] = useState("Raw");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { mutate: addPortfolio } = useEditPortfolio(ENDPOINTS.portfolioRaw);

  const { addNotification } = useAuthContext();

  const addDataHandler = (data: IAddProductsFormInput & { id: string }) => {
    const { foodType, id, productName, products, ...addData } = data;
    const addVarient = {} as { [key: string]: IProductVarient };
    addVarient[addData.variantId] = addData;
    addPortfolio({
      data: addVarient,
      productId: id,
      successCb: () => {
        Toast({ message: "Product added successfully.", type: "success" });
        addNotification({ id: data.id, image: data.profile, message: Message(data.name).addProduct });
      },
      errorCb: () => {
        Toast({ message: "Request failed, please try again.", type: "error" });
      },
    });
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

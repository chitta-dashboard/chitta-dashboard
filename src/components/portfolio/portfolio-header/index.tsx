import { Dispatch, FC, RefObject, SetStateAction, useState } from "react";
import SearchBar from "../../common-components/search-bar";
import { Button } from "@mui/material";
import ToggleButton from "../../../utils/ToggleButton";
import ProductsModal from "../../modals/products-modal";
import { IAddProductsFormInput, IProductVarient } from "../../modals/type/formInputs";
import { useEditPortfolio } from "../../../utils/hooks/query";
import { ENDPOINTS, Message, PRODUCT_DATA } from "../../../utils/constants";
import { useAuthContext } from "../../../utils/context/auth";
import S from "./portfolioHeader.styled";
import Toast from "../../../utils/toast";

interface Props {
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
  searchHandler?: (searchText: string) => void;
  searchRef: RefObject<HTMLInputElement>;
}

const PortfolioHeader: FC<Props> = ({ tab, setTab, searchHandler, searchRef }) => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { mutate: addPortfolio } = useEditPortfolio(ENDPOINTS.portfolioRaw);

  const { addNotification } = useAuthContext();

  const addDataHandler = (data: IAddProductsFormInput & { id: string }) => {
    const { foodType, id, productName, products, ...addData } = data;
    const addVarient = {} as { [key: string]: IProductVarient };
    addVarient[addData.variantId] = addData;
    const getProductImage = PRODUCT_DATA.raw.filter((product) => product.id === id);
    addPortfolio({
      data: addVarient,
      productId: id,
      successCb: () => {
        Toast({ message: "Product added successfully.", type: "success" });
        addNotification({
          id: `Add${data.id}${addData.availableAmount}${addData.variantName}`,
          image: getProductImage[0].image,
          message: Message(addData.variantName).addProduct,
        });
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
          <SearchBar searchHandler={searchHandler} ref={searchRef} />
          <S.ToolTip title={tab !== "Raw" ? "Temporarily unavailable" : ""} placement="bottom-start">
            <span>
              <Button
                onClick={() => setAddModalOpen(true)}
                disabled={tab !== "Raw" ? true : false}
                title={tab !== "Raw" ? "Temporary Unavailable" : ""}
              >
                Add
              </Button>
            </span>
          </S.ToolTip>
        </S.Action>
      </S.Header>
      {addModalOpen && <ProductsModal tab={tab} openModal={true} handleClose={() => setAddModalOpen(false)} cb={addDataHandler} />}
    </>
  );
};

export default PortfolioHeader;

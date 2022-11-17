import { FC, useState } from "react";
import SearchBar from "../../common-components/search-bar";
import { Button } from "@mui/material";
import ToggleButton from "../../../utils/ToggleButton";
import ProductsModal from "../../modals/products-modal";
import S from "./portfolioHeader.styled";

const PortfolioHeader: FC = () => {
  const [tab, setTab] = useState("Raw");
  const [addModalOpen, setAddModalOpen] = useState(false);

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
          <Button
            onClick={() => {
              setAddModalOpen(true);
            }}
          >
            Add
          </Button>
        </S.Action>
      </S.Header>
      {addModalOpen && <ProductsModal openModal={true} handleClose={() => {}} cb={(data) => {}} />}
    </>
  );
};

export default PortfolioHeader;

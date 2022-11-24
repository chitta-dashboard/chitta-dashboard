import { useEffect, useMemo, useRef, useState } from "react";
import { Popover } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import paddy from "../../../assets/images/paddy.png";
import millet from "../../../assets/images/millet.png";
import groundnut from "../../../assets/images/groundnut.png";
import maize from "../../../assets/images/maize.png";
import ragi from "../../../assets/images/ragi.png";
import blackgram from "../../../assets/images/blackgram.png";
import sugarcane from "../../../assets/images/sugarcane.png";
import cotton from "../../../assets/images/cotton.png";
import { handleDateDifference } from "../../../utils/helpers";
import DeleteModal from "../../modals/delete-modal";
import { ENDPOINTS, fileToBase64 } from "../../../utils/constants";
import { useEditPortfolio } from "../../../utils/hooks/query";
import { useAuthContext } from "../../../utils/context/auth";
import Toast from "../../../utils/toast";
import ProductsModal from "../../modals/products-modal";
import ConfirmationModal from "../../modals/confirmation-modal";
import { IAddProductsFormInput, IProductVarient } from "../../modals/type/formInputs";
import CS from "../../../components/common-styles/commonStyles.styled";
import S from "./itemCard.styled";

export interface IPortfolioVariant {
  variantId: string;
  variantName: string;
  productDescription: string;
  startDate: string;
  endDate: string;
  availableAmount: number;
  qualityGrade: string;
}

export interface IPortfolioProduct {
  id: string;
  productId: string;
  productName: string;
  variants: string[];
  [key: string]: IPortfolioVariant | string | string[];
}

export interface IPortfolio {
  data: IPortfolioProduct;
}

const ItemCard: React.FC<IPortfolio> = ({ data }) => {
  const { mutate } = useEditPortfolio(ENDPOINTS.portfolioRaw);
  const { addNotification } = useAuthContext();
  const [variantData, setVariantdata] = useState((): IPortfolioVariant => {
    for (let id of data.variants) {
      if (data[id] !== null) return data[id] as IPortfolioVariant;
    }
    return {} as unknown as IPortfolioVariant; // a hack to satisfy typescript.
  });
  const popoverAttachmentRef = useRef<HTMLParagraphElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState<(IAddProductsFormInput & { id: string }) | null>(null);
  const { mutate: editPortfolio } = useEditPortfolio(ENDPOINTS.portfolioRaw);

  const image = useMemo(() => {
    switch (data.productName) {
      case "Paddy Seeds":
        return paddy;
      case "Millet Seeds":
        return millet;
      case "Groundnut":
        return groundnut;
      case "Maize":
        return maize;
      case "Ragi Seeds":
        return ragi;
      case "Black Gram":
        return blackgram;
      case "Sugarcane":
        return sugarcane;
      case "Cotton Seeds":
        return cotton;
      default:
        return paddy;
    }
  }, [data.productName]);

  useEffect(() => {
    for (let id of data.variants) {
      if (data[id] !== null) return setVariantdata(data[id] as IPortfolioVariant);
    }
  }, [data]);

  const editDataHandler = (data: IAddProductsFormInput & { id: string }) => {
    setConfirmationModal(data);
  };

  return (
    <S.ItemCard>
      <S.SeedImage src={image} />
      <S.Title>{data.productName}</S.Title>
      <S.Grade grade={variantData.qualityGrade}>
        <span>{variantData.qualityGrade[0].toUpperCase()}</span>
        <span>{variantData.qualityGrade[1] || ""}</span>
      </S.Grade>
      <S.Span>
        <AccessTimeIcon /> {handleDateDifference(variantData.startDate, variantData.endDate)}
      </S.Span>
      <S.Description>{variantData.productDescription}</S.Description>
      <S.VarLabel>Variant:</S.VarLabel>
      <S.VarValue ref={popoverAttachmentRef} onClick={() => setPopoverOpen(true)}>
        <span>{variantData.variantName}</span>
        <ExpandMoreIcon />
      </S.VarValue>
      <S.StockLabel>Available:</S.StockLabel>
      <S.StockValue>{variantData.availableAmount} kg</S.StockValue>
      <S.DeleteIcon onClick={() => setDeleteModal(true)} />
      <S.EditIcon onClick={() => setEditModal(true)} />
      <Popover
        id={"resolution-certificate-popover"}
        open={popoverOpen}
        anchorEl={popoverAttachmentRef.current}
        onClose={() => setPopoverOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {data.variants.map((id) => {
          if (data[id] === null) return null;
          return (
            <S.PopoverItem
              key={id}
              onClick={() => {
                setPopoverOpen(false);
                if (id !== variantData.variantId) setVariantdata(data[id] as IPortfolioVariant);
              }}
              selected={id === variantData.variantId}
            >
              {(data[id] as IPortfolioVariant).variantName}
            </S.PopoverItem>
          );
        })}
      </Popover>
      {deleteModal && (
        <DeleteModal
          deleteMessage={
            <>
              Do you want to remove{" "}
              <CS.Bold>
                {data.productName} - {variantData.variantName}
              </CS.Bold>{" "}
              data?
            </>
          }
          openModal={true}
          handleDelete={() => {
            mutate({
              data: {
                [variantData.variantId]: null,
              },
              productId: data.id,
              successCb: async () => {
                const base64Image = await fileToBase64(image, true);
                addNotification({
                  message: `Product ${variantData.variantName} - ${data.productName} has been deleted.`,
                  id: "delete_" + variantData.variantId + data.productName,
                  image: base64Image,
                });
                Toast({ message: `Product ${variantData.variantName} - ${data.productName} has been deleted.`, type: "success" });
              },
            });
            setDeleteModal(false);
          }}
          handleClose={() => setDeleteModal(false)}
        />
      )}
      {editModal && (
        <ProductsModal
          openModal={true}
          handleClose={() => setEditModal(false)}
          cb={editDataHandler}
          editMode={editModal}
          id={data.id}
          variantData={variantData}
        />
      )}
      {confirmationModal && (
        <ConfirmationModal
          openModal={true}
          handleClose={() => setConfirmationModal(null)}
          yesAction={() => {
            const { foodType, id, productName, products, ...editData } = confirmationModal;
            const editVarient = {} as { [key: string]: IProductVarient };
            editVarient[editData.variantId] = editData;
            editPortfolio({
              data: editVarient,
              productId: id,
              successCb: () => {
                Toast({ message: "Product Edited successfully.", type: "success" });
              },
              errorCb: () => {
                Toast({ message: "Request failed, please try again.", type: "error" });
              },
            });
            setEditModal(false);
            setConfirmationModal(null);
          }}
        />
      )}
    </S.ItemCard>
  );
};

export default ItemCard;

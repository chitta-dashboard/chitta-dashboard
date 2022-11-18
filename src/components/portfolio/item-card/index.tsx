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
  const [variantData, setVariantdata] = useState((): IPortfolioVariant => {
    for (let id of data.variants) {
      if (data[id] !== null) return data[id] as IPortfolioVariant;
    }
    return {} as unknown as IPortfolioVariant; // a hack to satisfy typescript.
  });
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { mutate } = useEditPortfolio(ENDPOINTS.portfolioRaw, data.id);
  const { addNotification } = useAuthContext();
  const popoverAttachmentRef = useRef<HTMLParagraphElement>(null);
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
      <S.StockValue>{variantData.availableAmount}</S.StockValue>
      <S.DeleteIcon onClick={() => setDeleteModalOpen(true)} />
      <S.EditIcon />
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
      {deleteModalOpen && (
        <DeleteModal
          deleteMessage={
            <span>
              Do you want to delete{" "}
              <S.HighlightText>
                {data.productName} - {variantData.variantName}
              </S.HighlightText>{" "}
              data?
            </span>
          }
          openModal={true}
          handleDelete={() => {
            mutate({
              data: {
                [variantData.variantId]: null,
              },
              successCb: async () => {
                const base64Image = await fileToBase64(image, true);
                addNotification({
                  message: `Product ${variantData.variantName} - ${data.productName} has been deleted.`,
                  id: "delete_" + variantData.variantId,
                  image: base64Image,
                });
                Toast({ message: `Product ${variantData.variantName} - ${data.productName} has been deleted.`, type: "success" });
              },
            });
            setDeleteModalOpen(false);
          }}
          handleClose={() => setDeleteModalOpen(false)}
        />
      )}
    </S.ItemCard>
  );
};

export default ItemCard;
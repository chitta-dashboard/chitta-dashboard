import { FC, useEffect, useState } from "react";
import { Control, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { ENDPOINTS, Endpoints, VARIANT_DATA, PRODUCT_DATA } from "../../../utils/constants";
import { useFetch } from "../../../utils/hooks/query";
import { IAddProductsFormInput } from "../type/formInputs";
import CustomModal from "../../custom-modal";
import FormField from "./body/formField";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";

interface CustomProps {
  cb: (data: IAddProductsFormInput & { id: string; products: string[]; variantName: string }) => void;
  openModal: boolean;
  handleClose: () => void;
  editMode?: boolean;
  products?: string[];
  id?: string;
  variantData?: any;
  tab?: string;
}

const ProductsModal: FC<CustomProps> = (props) => {
  const { openModal, handleClose, cb, editMode = false, id = "", products = [], variantData } = props;
  const { handleSubmit, clearErrors, reset, control: formControl, watch } = useForm<IAddProductsFormInput>();
  const [availableList, setAvailableList] = useState<string[] | null>(null);
  const [variantList, setVariantList] = useState<string[][] | null>(null);
  const [productName, setProductName] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const productNameHandler = (name: string) => {
    setProductName(name);
  };
  const productIdHandler = (id: string) => {
    setProductId(id);
  };
  const {
    formatChangeSuccess: isSuccess,
    result: { data: productDetails },
  } = useFetch(ENDPOINTS.portfolioRaw as Endpoints);
  const productImage = editMode && PRODUCT_DATA.raw.filter((product) => product.id === id)[0].image;

  // for enabling the submit button
  const productNameEvent = watch("productName");
  const variantEvent = watch("variantId");
  const startDateEvent = watch("startDate");
  const endDateEvent = watch("endDate");
  const availableAmountEvent = watch("availableAmount");
  const qualityGradeEvent = watch("qualityGrade");
  const foodTypeEvent = watch("foodType");
  const descriptionEvent = watch("productDescription");
  let enableButton = true;

  // for disabling the variant options
  useEffect(() => {
    if (productName && productDetails) {
      const productId: any = PRODUCT_DATA.raw.filter((i) => i.name === productName).map((i) => i.id);
      const variantsId = Object.keys(VARIANT_DATA[productId]);
      const dbVariantsTemp = productDetails[productId] ? productDetails[productId].variants : [""];
      const temp = productDetails[productId]
        ? Object.keys(Object.fromEntries(Object.entries(productDetails[productId]).filter(([_, v]) => v === null)))
        : [""];
      const dbVariants = dbVariantsTemp.filter((item: any) => !temp.includes(item));
      setAvailableList(variantsId.filter((item) => !dbVariants.includes(item)));
      const final = Object.keys(VARIANT_DATA[productId]).map((item: string) => [item, VARIANT_DATA[productId][item]]);
      setVariantList(final);
    }
  }, [productName, productDetails]);

  if (
    productNameEvent &&
    variantEvent &&
    startDateEvent &&
    endDateEvent &&
    availableAmountEvent &&
    qualityGradeEvent &&
    foodTypeEvent &&
    descriptionEvent
  ) {
    enableButton = false;
  }

  useEffect(() => {
    if (editMode) {
      let productData = Object.values(isSuccess && (productDetails as CustomProps)).find((f) => String(f.id) === id);
      setProductName(productData?.productName);
      reset({
        foodType: productData?.foodType as string,
        productDescription: variantData?.productDescription as string,
        productName: productData?.productName as string,
        variantId: variantData?.variantId as string,
        startDate: variantData?.startDate as string,
        endDate: variantData?.endDate as string,
        availableAmount: variantData?.availableAmount as string,
        qualityGrade: variantData?.qualityGrade as string,
      });
    }
    return () =>
      reset({
        productName: "",
        variantId: "",
        startDate: "",
        endDate: "",
        availableAmount: "",
        qualityGrade: "",
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode, id]);

  const onSubmit: any = (data: IAddProductsFormInput & { id: string; products: string[] }) => {
    const variantName = editMode ? variantData?.variantName : VARIANT_DATA[productId][data.variantId];
    cb({ ...data, id: editMode ? id : productId, products: products, variantName: variantName, timestamp: new Date().getTime() });
    !editMode && reset();
    !editMode && handleClose();
  };

  return (
    <CustomModal
      openModal={openModal}
      handleClose={() => {
        reset();
        handleClose();
      }}
    >
      <ModalHeader
        handleClose={() => {
          clearErrors();
          reset();
          handleClose();
        }}
      >
        {editMode ? "Edit product" : "Add product"}
      </ModalHeader>

      <ModalBody id={"products"} onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={formControl as unknown as Control}
          variantList={variantList}
          availableList={availableList}
          setProductName={productNameHandler}
          setProductId={productIdHandler}
          productImage={productImage as string}
          disableOnEdit={editMode ? 1 : 0}
          tab={props.tab}
        />
      </ModalBody>

      <ModalFooter>
        <Button form="products" type="submit" disabled={enableButton}>
          Submit
        </Button>
      </ModalFooter>
    </CustomModal>
  );
};
export default ProductsModal;

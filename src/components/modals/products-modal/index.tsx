import { FC, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
  cb: (data: IAddProductsFormInput & { id: string; members: string[] }) => void;
  openModal: boolean;
  handleClose: () => void;
  editMode?: boolean;
  id?: string;
  products?: string[];
}

const ProductsModal: FC<CustomProps> = (props) => {
  const { openModal, handleClose, cb, editMode = false, id = "", products = [] } = props;
  const { handleSubmit, clearErrors, reset, control: formControl, watch } = useForm<IAddProductsFormInput>();
  const { result, formatChangeSuccess: isSuccess } = useFetch(ENDPOINTS.farmerGroup);
  const { data: farmerGroupData } = result;
  const [results, setResults] = useState<string[] | null>(null);
  const {
    formatChangeSuccess: isSuccessPortfolio,
    result: { data: productDetails },
  } = useFetch(ENDPOINTS.portfolioRaw as Endpoints);

  // for enabling the submit button
  const productNameEvent = watch("productName");
  const variantEvent = watch("variant");
  const startDateEvent = watch("startDate");
  const endDateEvent = watch("endDate");
  const availableAmountEvent = watch("availableAmount");
  const qualityGradeEvent = watch("qualityGrade");
  let enableButton = true;

  // for disabling the variant options
  const variantList = useMemo(() => {
    if (productNameEvent && productDetails) {
      const productId: any = PRODUCT_DATA.raw.filter((i) => i.name === productNameEvent).map((i) => i.id);
      //@ts-ignore
      const variants = Object.values(VARIANT_DATA[productId]);
      const variantsId = Object.keys(VARIANT_DATA[productId]);
      //@ts-ignore
      const dbVariants = productDetails[productId].variants;
      setResults(variantsId.filter((item) => !dbVariants.includes(item)));
      const filteredList = results && results.map((item: string) => [item, VARIANT_DATA[productId][item]]);
      const final = Object.keys(VARIANT_DATA[productId]).map((item: string) => [item, VARIANT_DATA[productId][item]]);
      return final;
    }
  }, [productNameEvent, productDetails]);

  if (productNameEvent && variantEvent && startDateEvent && endDateEvent && availableAmountEvent && qualityGradeEvent) {
    enableButton = false;
  } else {
    enableButton = true;
  }

  useEffect(() => {
    if (editMode) {
      let productData = Object.values(isSuccess && (farmerGroupData as CustomProps)).find((f) => String(f.id) === id);
      reset({
        productName: productData?.productName as string,
        variant: productData?.variant as string,
        startDate: productData?.startDate as string,
        endDate: productData?.endDate as string,
        availableAmount: productData?.availableAmount as string,
        qualityGrade: productData?.qualityGrade as string,
      });
    }
    return () =>
      reset({
        productName: "",
        variant: "",
        startDate: "",
        endDate: "",
        availableAmount: "",
        qualityGrade: "",
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode, id]);

  const onSubmit: any = (data: IAddProductsFormInput & { id: string; products: string[] }) => {
    cb({ ...data, id: editMode ? id : uuidv4(), members: products });
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
        {editMode ? "Edit products" : "Add products"}
      </ModalHeader>

      <ModalBody id={"products"} onSubmit={handleSubmit(onSubmit)}>
        <FormField control={formControl as unknown as Control} variantList={variantList} result={results as any} />
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

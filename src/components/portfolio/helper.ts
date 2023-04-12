import { PRODUCT_DATA, VARIANT_DATA } from "../../utils/constants";

export const getProductStructure = (id: string) => {
  //constants
  const data = PRODUCT_DATA.raw[PRODUCT_DATA.raw.findIndex((p) => p.id === id)];
  const variants = Object.keys(VARIANT_DATA[id]);
  const structure: {
    [key: string]: string | string[] | null;
  } = {
    id: id,
    productId: data.productId as unknown as string,
    productName: data.name,
    foodType: "Raw",
    variants: Object.keys(VARIANT_DATA[id]),
  };

  variants.forEach((v) => (structure[v] = null));

  return structure;
};

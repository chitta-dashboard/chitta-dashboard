import { ChangeEvent } from "react";

import FooterWrapper from "../../../custom-tables/footer";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";

const Footer = () => {
  const { farmersList, page, setPage, rowsPerPage } = useFarmerDetailsContext();
  const count = Math.ceil(farmersList.length / rowsPerPage);

  //Page Change Handler
  const pageHandler = (e: ChangeEvent<unknown>, pageNo: number) => {
    setPage(pageNo);
  };
  return <FooterWrapper pageHandler={pageHandler} count={count} page={page} totalCount={farmersList.length} rowsPerPage={rowsPerPage} />;
};

export default Footer;

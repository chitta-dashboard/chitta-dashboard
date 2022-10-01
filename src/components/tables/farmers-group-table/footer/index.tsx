import FooterWrapper from "../../../custom-tables/footer";
import { useFarmerGroupDetailsContext } from "../../../../utils/context/farmersGroup";
import { ChangeEvent } from "react";

const Footer = () => {
  const { farmerGroupList, page, setPage, rowsPerPage } = useFarmerGroupDetailsContext();
  const count = Math.ceil(farmerGroupList.length / rowsPerPage);

  //Page Change Handler
  const pageHandler = (e: ChangeEvent<unknown>, pageNo: number) => {
    setPage(pageNo);
  };

  return <FooterWrapper pageHandler={pageHandler} count={count} page={page} totalCount={farmerGroupList.length} rowsPerPage={rowsPerPage} />;
};

export default Footer;

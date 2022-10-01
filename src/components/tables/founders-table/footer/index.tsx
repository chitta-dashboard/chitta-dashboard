import { ChangeEvent } from "react";

import { useFounderContext } from "../../../../utils/context/founders";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  const { mdList, page, setPage, rowsPerPage } = useFounderContext();
  const count = Math.ceil(mdList.length / rowsPerPage);

  //Page Change Handler
  const pageHandler = (e: ChangeEvent<unknown>, pageNo: number) => {
    setPage(pageNo);
  };

  return mdList.length > 0 ? (
    <FooterWrapper pageHandler={pageHandler} count={count} page={page} totalCount={mdList.length} rowsPerPage={rowsPerPage} />
  ) : null;
};

export default Footer;

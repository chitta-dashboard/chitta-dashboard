import React from "react";
import { useMdDetailsContext } from "../../../../utils/context/md-details";

import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  const { mdList } = useMdDetailsContext();

  return mdList.length > 0 ? <FooterWrapper /> : null;
};

export default Footer;

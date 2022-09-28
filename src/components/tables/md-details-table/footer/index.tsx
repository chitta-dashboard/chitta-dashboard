import { useMdDetailsContext } from "../../../../utils/context/mdDetails";

import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  const { mdList } = useMdDetailsContext();

  return mdList.length > 0 ? <FooterWrapper /> : null;
};

export default Footer;

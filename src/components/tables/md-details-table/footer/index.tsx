import { useMdDetailsContext } from "../../../../utils/context/mdDetails";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  const { mdList, page, rowsPerPage } = useMdDetailsContext();
  const count = Math.ceil(Object.values(mdList).length / rowsPerPage);

  return Object.values(mdList).length > 0 ? (
    <FooterWrapper count={count} page={page} totalCount={Object.values(mdList).length} rowsPerPage={rowsPerPage} />
  ) : null;
};

export default Footer;

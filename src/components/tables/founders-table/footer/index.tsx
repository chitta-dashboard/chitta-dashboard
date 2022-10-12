import { useFounderContext } from "../../../../utils/context/founders";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  const { foundersById } = useFounderContext();
  const count = Math.ceil(Object.values(foundersById).length / 6);

  return Object.values(foundersById).length > 0 ? (
    <FooterWrapper count={count} page={1} totalCount={Object.values(foundersById).length} rowsPerPage={6} />
  ) : null;
};

export default Footer;

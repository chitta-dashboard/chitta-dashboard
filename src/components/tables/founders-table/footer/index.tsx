import { ENDPOINTS } from "../../../../utils/constants";
import { useFetch } from "../../../../utils/hooks/query";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  const {
    formatChangeSuccess,
    result: { data: foundersById },
  } = useFetch(ENDPOINTS.founders);

  const count = Math.ceil(Object.values(formatChangeSuccess && foundersById).length / 6);

  return Object.values(formatChangeSuccess && foundersById).length > 0 ? (
    <FooterWrapper count={count} page={1} totalCount={Object.values(foundersById).length} rowsPerPage={6} />
  ) : null;
};

export default Footer;

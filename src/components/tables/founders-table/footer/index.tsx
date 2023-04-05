import { ENDPOINTS } from "../../../../utils/constants";
import { useFetch } from "../../../../utils/hooks/query";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  //constants
  const {
    formatChangeSuccess: isFoundersSuccess,
    result: { data: foundersById },
  } = useFetch(ENDPOINTS.founders);

  const count = Math.ceil(Object.values(isFoundersSuccess && foundersById).length / 6);

  return Object.values(isFoundersSuccess && foundersById).length > 0 ? (
    <FooterWrapper count={count} page={1} totalCount={Object.values(foundersById).length} rowsPerPage={6} />
  ) : null;
};

export default Footer;

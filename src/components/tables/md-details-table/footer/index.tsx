import { ENDPOINTS } from "../../../../utils/constants";
import { useFetch } from "../../../../utils/hooks/query";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  const { formatChangeSuccess: isSuccess, result } = useFetch(ENDPOINTS.mdDetails);
  const { data: mdData } = result;
  const count = Math.ceil(Object.values(isSuccess && mdData).length / 6);

  return Object.values(isSuccess && mdData).length > 0 ? (
    <FooterWrapper count={count} page={1} totalCount={Object.values(isSuccess && mdData).length} rowsPerPage={6} />
  ) : null;
};

export default Footer;

import { forwardRef, Fragment } from "react";
import { ENDPOINTS } from "../../utils/constants";
import { farmerDetail } from "../../utils/context/farmersDetails";
import { useFetch } from "../../utils/hooks/query";
import CredentialsContainerContent from "./credentials-certificate-content/credentials-certificate-content";

interface Props {
  farmerDatatoPrint?: { id: string | null; password: string | null };
}

const CredentialsCertificate = forwardRef<HTMLDivElement, Props>(({ farmerDatatoPrint }, ref) => {
  // constants
  const {
    formatChangeSuccess: isFarmerDetailsSuccess,
    result: { data: farmersDetailsById },
  } = useFetch(ENDPOINTS.farmerDetails);

  return (
    <div className="print-container" ref={ref}>
      {isFarmerDetailsSuccess &&
        farmerDatatoPrint &&
        Object.values(farmersDetailsById as farmerDetail[])
          .filter((name) => farmerDatatoPrint.id === name.id)
          .map((user: farmerDetail) => (
            <Fragment key={user.id}>
              <CredentialsContainerContent user={user} farmerDatatoPrint={farmerDatatoPrint} />
            </Fragment>
          ))}
    </div>
  );
});

export default CredentialsCertificate;

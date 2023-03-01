import { forwardRef, Fragment } from "react";
import { ENDPOINTS } from "../../utils/constants";
import { farmerDetail, useFarmerDetailsContext } from "../../utils/context/farmersDetails";
import { useFetch } from "../../utils/hooks/query";
import ShareCertificateContent from "./share-certificate-content";

interface Props {
  shareAmount?: number | string;
  toggle?: boolean;
}

const ShareCertificate = forwardRef<HTMLDivElement, Props>(({ shareAmount, toggle }, ref) => {
  //constant
  const {
    formatChangeSuccess: isSuccess,
    result: { data: farmersDetailsById },
  } = useFetch(ENDPOINTS.farmerDetails);
  const { formatChangeSuccess: isSuccessAdmin } = useFetch(ENDPOINTS.admin);
  const { selectedFarmers } = useFarmerDetailsContext();

  return (
    <div className="print-container" ref={ref}>
      {isSuccess &&
        isSuccessAdmin &&
        selectedFarmers.map((id: any) =>
          Object.values(farmersDetailsById as farmerDetail[])
            .filter((user) => user.id === id)
            .map((user) => {
              return (
                <Fragment key={user.id}>
                  <ShareCertificateContent user={user} shareAmount={shareAmount} />
                  {toggle && <ShareCertificateContent user={user} shareAmount={shareAmount} />}
                </Fragment>
              );
            }),
        )}
    </div>
  );
});

export default ShareCertificate;

import { forwardRef, Fragment } from "react";
import { S } from "./tamil-certificate.styled";
import { ENDPOINTS } from "../../utils/constants";
import { farmerDetail, useFarmerDetailsContext } from "../../utils/context/farmersDetails";
import { useFetch } from "../../utils/hooks/query";
import TamilShareHolderCertificateContent from "./tamil-certificate-content";

interface Props {
  shareAmount?: number | string;
  toggle?: boolean;
}

const TamilShareHolderCertificate = forwardRef<HTMLDivElement, Props>(({ shareAmount, toggle }, ref) => {
  // state values
  const { selectedFarmers } = useFarmerDetailsContext();
  // Queries
  const {
    formatChangeSuccess: isSuccess,
    result: { data: farmersDetailsById },
  } = useFetch(ENDPOINTS.farmerDetails);

  const { formatChangeSuccess: isSuccessAdmin } = useFetch(ENDPOINTS.admin);

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
                  <TamilShareHolderCertificateContent user={user} shareAmount={shareAmount} toggle={toggle} />
                  {toggle && (
                    <>
                      <S.CertificateGap />
                      <TamilShareHolderCertificateContent user={user} shareAmount={shareAmount} toggle={toggle} />
                    </>
                  )}
                </Fragment>
              );
            }),
        )}
    </div>
  );
});

export default TamilShareHolderCertificate;

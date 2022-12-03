import { forwardRef, Fragment } from "react";
import { farmerDetail } from "../../utils/store/slice/farmerDetails";
import { useFetch } from "../../utils/hooks/query";
import { ENDPOINTS } from "../../utils/constants";
import { useFarmerDetailsContext } from "../../utils/context/farmersDetails";
import { S } from "./tamil-certificate.styled";
import TamilShareHolderCertificateContent from "./tamil-certificate-content";

interface Props {
  shareAmount?: number | string;
}

const TamilShareHolderCertificate = forwardRef<HTMLDivElement, Props>(({ shareAmount }, ref) => {
  const { selectedFarmers } = useFarmerDetailsContext();

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
            .map((user, i) => {
              return (
                <>
                  <TamilShareHolderCertificateContent user={user} shareAmount={shareAmount} />
                  <S.CertificateGap />
                  <TamilShareHolderCertificateContent user={user} shareAmount={shareAmount} />
                </>
              );
            }),
        )}
    </div>
  );
});

export default TamilShareHolderCertificate;

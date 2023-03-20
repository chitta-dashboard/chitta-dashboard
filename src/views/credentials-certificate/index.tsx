import { forwardRef, Fragment } from "react";
import CredentialsContainerContent from "./credentials-certificate-content/credentials-certificate-content";

interface Props {}

const CredentialsCertificate = forwardRef<HTMLDivElement, Props>(({}, ref) => {
  return (
    <div className="print-container" ref={ref}>
      <CredentialsContainerContent />
    </div>
  );
});

export default CredentialsCertificate;

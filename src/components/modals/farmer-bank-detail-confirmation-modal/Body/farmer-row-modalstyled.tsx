import { styled, Box } from "@mui/material";

namespace S {
  export const FarmerBankDetailBodyContainer = styled(Box)({
    // height: "6rem",
    width: "29.375rem",
    padding: "0 0.625rem",
    display: "flex !important",
    flexDirection: "column",
    justifyContent: "center !important",
    alignItems: "center !important",
    gap: "1.8rem",
  });

  export const ToggleSwitchContainer = styled(Box)({
    display: "flex !important",
    justifyContent: "center !important",
    fontSize: "1.2rem",
    gap: "4rem",
    width: "100%",
  });
}
export default S;

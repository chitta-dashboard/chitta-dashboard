import { styled, keyframes, Dialog } from "@mui/material";

namespace S {
  export const load = keyframes`
    0%{
     transform: scaleY(1);
    }
    50%{
       transform: scaleY(2);
    }
    100% {
     transform: scaleY(1);
     }
    `;

  export const Container = styled(Dialog)(({ theme }) => ({
    "& .MuiBackdrop-root": {
      backgroundColor: theme.palette.custom.backdrop,
    },
    "& .MuiPaper-root": {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
  }));
  export const LoaderContainer = styled("div")({
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "3rem",
  });

  export const LoaderParticle1 = styled("span")(({ theme }) => ({
    width: ".3rem",
    height: "1rem",
    marginLeft: ".5rem",
    // borderRadius: "50%",
    backgroundColor: theme.palette.primary.light,
    animation: `${load} 0.5s ease-in-out infinite`,
  }));

  export const LoaderParticle2 = styled("span")(({ theme }) => ({
    width: ".3rem",
    height: "1rem",
    margin: "0 .5rem 0 .5rem",
    // borderRadius: "50%",
    backgroundColor: theme.palette.primary.light,
    animation: `${load} 0.5s ease-in-out 0.25s infinite`,
  }));

  export const LoaderParticle3 = styled("span")(({ theme }) => ({
    width: ".3rem",
    height: "1rem",
    // borderRadius: "50%",
    backgroundColor: theme.palette.primary.light,
    animation: `${load} 0.5s ease-in-out infinite`,
  }));
}

export default S;

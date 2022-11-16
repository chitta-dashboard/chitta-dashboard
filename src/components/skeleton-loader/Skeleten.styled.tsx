import { styled, Skeleton } from "@mui/material";

namespace S {
  export const Container = styled("div")({
    display: "grid",
    gridTemplateAreas: `
    "txt1 txt1 txt1"
      "img  rnd rnd"
      "img txt2 txt2"
      "txt3 txt3 txt3"
      "txt4 txt4 txt4"
    `,
    gridTemplateRows: "auto 150px",
    columnGap: ".5rem",
    rowGap: "1px",
    height: "100%",
    width: "100%",
  });

  export const Text1 = styled(Skeleton)({
    gridArea: "txt1",
    fontSize: ".5rem",
  });

  Text1.defaultProps = {
    variant: "text",
    animation: "wave",
  };
  export const Text2 = styled(Skeleton)({
    gridArea: "txt2",
    fontSize: ".1rem",
    padding: 0,
    marginTop: "-10px",
  });

  Text2.defaultProps = {
    variant: "text",
    animation: "wave",
  };
  export const Text3 = styled(Skeleton)({
    marginTop: "-5px",
    // height: "50px",
    gridArea: "txt3",
    fontSize: ".5rem",
  });

  Text3.defaultProps = {
    variant: "text",
    animation: "wave",
  };
  export const Text4 = styled(Skeleton)({
    marginTop: "-10px",
    // height: "50px",
    gridArea: "txt4",
    fontSize: ".5rem",
  });

  Text4.defaultProps = {
    variant: "text",
    animation: "wave",
  };

  export const Image = styled(Skeleton)({
    gridArea: "img",
    height: "100%",
    width: "100%",
  });

  Image.defaultProps = {
    variant: "circular",
    animation: "wave",
  };

  export const Rounded = styled(Skeleton)({
    gridArea: "rnd",
    height: "100%",
    width: "100%",
  });

  Rounded.defaultProps = {
    variant: "rounded",
    animation: "wave",
  };
}

export default S;

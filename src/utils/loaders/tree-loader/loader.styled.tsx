import { styled, keyframes, Stack } from "@mui/material";
import { LightTheme } from "../../theme";

namespace S {
  export const growY = keyframes`
    0%{
      transform:scaleY(0)
    }
    100%{
      transform: scaleY(1);
    }
    `;

  export const growScale = keyframes`
    0%{
      transform: scale(1);
    }
    25%{
      transform: scale(.5);
    }
    50%{
      transform: scale(1);
    }
    75%{
      transform: scale(.5); 
    }
    100%{
      transform:scale(1);
    }
    `;
  export const growColor = keyframes`
    0%{
      background: ${LightTheme.palette.custom.disabled},
    }
  
    25%{
      background:${LightTheme.palette.tree.l1}
    }
    50%{
      background: ${LightTheme.palette.tree.r1};
    }
    75%{
      background:${LightTheme.palette.tree.r2};
    }
    90%{
      background: ${LightTheme.palette.tree.l2};
    }
    100%{
      background: ${LightTheme.palette.tree.r1};
    }
    `;

  export const OuterStem = styled("div")({
    borderRadius: "0px 0px 0px 50px",
    width: " 10px",
    height: "100px",
    background: `${LightTheme.palette.custom.disabled}`,
  });

  export const InnerStem = styled("div")({
    borderRadius: "0px 0px 0px 50px",
    height: "100px",
    width: "10px",
    backgroundColor: "green",
    transformOrigin: "bottom",
    animation: `${growY} ${5}s linear backwards, pause-between-iterations 4s`,
    animationIterationCount: "inherit",
  });

  export const StemContainer = styled(Stack)({
    position: "absolute",
    transform: "translate(43px,35px)",
    zIndex: 0,
  });

  export const SmallLeaf = styled("div")({
    transform: "matrix(0.71, 0.71, 0.71, -0.71, 0, 0)",
    top: "50px",
    marginTop: "17px",
    width: " 45px",
    borderRadius: "0px 40px",
    height: "50px",
    animation: `${growColor} ${10}s linear both`,
    animationIterationCount: "infinite",
    backgroundColor: `${LightTheme.palette.custom.disabled}`,
    animationDelay: "4s",
  });

  export const BigLeaf = styled("div")({
    width: "64px",
    height: "50px",
    left: "351px",
    top: "142px",
    borderRadius: "0px 40px",
    transform: "matrix(-1, 0, 0, 1, 0, 0)",
    animation: `${growColor} ${10}s linear both`,
    animationIterationCount: "infinite",
    animationDelay: "4s",
    backgroundColor: `${LightTheme.palette.custom.disabled}`,
  });

  export const LeafContainer = styled(Stack)({
    position: "absolute",
    animation: `${growScale} ${10}s linear both`,
    animationDelay: "4s",
    animationIterationCount: "infinite",
    zIndex: 1,
    img: {
      position: "absolute",
      top: "5px",
      left: "5px",
      zIndex: 2,
    },
  });

  LeafContainer.defaultProps = {
    direction: "row",
  };
  export const AnimationContainer = styled("div")({
    width: "10rem",
    height: "10rem",
    padding: " 1.5rem ",
  });
  export const container = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  });
}
export default S;

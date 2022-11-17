import { CSSInterpolation, styled, Typography } from "@mui/material";

namespace S {
  export const ItemCard = styled("div")(({ theme }) => ({
    minWidth: "27rem",
    maxWidth: "27rem",
    height: "16rem",
    borderRadius: "10px",
    boxShadow: `0 4px 15px ${theme.palette.addAlpha(theme.palette.custom.shadow, 0.2)}`,
    padding: "1rem",
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridTemplateRows: "38px 30px 5.5rem 45px auto",
    gridTemplateAreas: `
      "img img img img ttl ttl ttl ttl ttl ttl ttl grd"
      "img img img img spn spn spn spn spn spn spn grd"
      "img img img img dsc dsc dsc dsc dsc dsc dsc dsc"
      "vlb vlb . vvl vvl vvl vvl vvl vvl vvl vvl vvl"
      "slb slb . svl svl svl svl svl svl . dli edi"
    `,
  }));

  export const SeedImage = styled("img")({
    alignSelf: "center",
    justifySelf: "center",
    gridArea: "img",
  });

  export const Title = styled(Typography)({
    fontSize: "1.5rem",
    fontWeight: "600",
    gridArea: "ttl",
  });

  export const Grade = styled("div", {
    shouldForwardProp: (prop) => prop !== "grade",
  })<{ grade: string }>(({ theme, grade }) => {
    const result: CSSInterpolation = {
      width: "3rem",
      gridArea: "grd",
      lineHeight: "1",
      position: "relative",
      color: theme.palette.text.primary,

      "span:first-of-type": {
        position: "absolute",
        fontSize: "3.5rem",
        top: "0",
        left: "0",
        fontWeight: "500",
        fontFamily: "monospace",
      },

      "span:last-of-type": {
        fontSize: "1.3rem",
        fontWeight: "600",
        position: "absolute",
        top: "0",
        right: "0",
      },
    };

    if (grade[0].toUpperCase() === "B") result.color = theme.palette.tree.r1;
    else if (grade[0].toUpperCase() === "C") result.color = theme.palette.tree.l2;

    return result;
  });

  export const Span = styled(Typography)(({ theme }) => ({
    gridArea: "spn",
    fontSize: ".625rem",
    fontWeight: "500",
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "start",
    gap: "3px",

    ".MuiSvgIcon-root": {
      fontSize: ".8rem",
    },
  }));

  export const Description = styled(Typography)(({ theme }) => ({
    fontSize: ".75rem",
    color: theme.palette.text.secondary,
    overflowY: "auto",
    gridArea: "dsc",
  }));

  export const VarLabel = styled(Typography)(({ theme }) => ({
    fontSize: ".875rem",
    color: theme.palette.text.secondary,
    alignSelf: "end",
    gridArea: "vlb",
  }));

  export const VarValue = styled(VarLabel)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: ".3rem",
    gridArea: "vvl",
    cursor: "pointer",

    span: {
      maxWidth: "200px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  }));

  export const StockLabel = styled(VarLabel)(({ theme }) => ({
    gridArea: "slb",
  }));

  export const StockValue = styled(VarValue)(({ theme }) => ({
    color: theme.palette.text.secondaryDark,
    gridArea: "svl",
  }));

  export const DeleteIcon = styled("i")(({ theme }) => ({
    color: theme.palette.text.primary,
    alignSelf: "end",
    fontSize: "1.7rem",
    marginRight: "1rem",
    gridArea: "dli",
  }));
  DeleteIcon.defaultProps = {
    className: "nerkathir-icon-delete",
  };

  export const EditIcon = styled(DeleteIcon)(({ theme }) => ({
    marginRight: "unset",
    gridArea: "edi",
  }));
  EditIcon.defaultProps = {
    className: "nerkathir-icon-edit",
  };

  export const PopoverItem = styled(Typography, {
    shouldForwardProp: (prop) => prop !== "selected",
  })<{ selected: boolean }>(({ theme, selected }) => {
    const style: CSSInterpolation = {
      fontSize: ".9rem",
      fontWeight: "500",
      padding: "0.5rem 1rem",
      border: `1px solid ${theme.palette.addAlpha(theme.palette.border.secondary, 0.1)}`,
      color: selected ? theme.palette.text.primary : theme.palette.text.secondary,
      backgroundColor: selected ? theme.palette.bg.light : "unset",
      cursor: "pointer",

      "&:hover": {
        backgroundColor: theme.palette.bg.light,
        color: theme.palette.text.primary,
      },
    };

    return style;
  });
}

export default S;

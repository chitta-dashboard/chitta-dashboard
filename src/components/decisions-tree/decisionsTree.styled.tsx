import { Box, styled } from "@mui/material";

export namespace S {
    export const DecisionsTreeContainer = styled(Box)(({theme}) => ({
        backgroundColor: "white",
        borderRadius: theme.shape.borderRadius,
    }))
}
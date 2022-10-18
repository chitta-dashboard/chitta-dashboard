import { keyframes } from "@mui/material";

export const growX = keyframes`
    0% {
        transform: scaleX(0);
    }

    100% {
        transform: scaleX(1);
    }
`;

export const growY = keyframes`
    0% {
        transform: scaleY(0);
    }

    100% {
        transform: scaleY(1);
    }
`;

export const popIn = keyframes`
    0% {
        opacity: 0;
        transform: scale(.5)
    }

    70% {
        transform: scale(1.03)
    }

    100% {
        opacity: 1;
        transform: scale(1)
    }
`;

export const slideUp = keyframes`
    0% {
        opacity: 0;
        transform: translateY(11px);
    }

    70% {
        transform: translateY(-5px);
    }
    
    100% {
        opacity: 1;
        transform: translateY(0px);
    }
`;

export const STEM_DURATION = 0.2;
export const BRANCH_DURATION = 0.2;
export const LEAF_DURATION = 0.4;
export const TOTAL_DURATION = STEM_DURATION + BRANCH_DURATION + LEAF_DURATION;

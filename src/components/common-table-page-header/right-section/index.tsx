import React, { useState } from "react";
import { Popover } from "@mui/material";
import { FC } from "react";

import IconWrapper from "../../../utils/iconWrapper";

import S from "./rightSection.styled";
interface RightSectionProps {
  addModalHandler?: () => void;
}

const RightSection: FC<RightSectionProps> = (props) => {
  const [popoverOpen, setPopoverOpen] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPopoverOpen(event.currentTarget);
  };

  const handleClose = () => {
    setPopoverOpen(null);
  };

  const open = Boolean(popoverOpen);

  return (
    <S.RightSectionContainer>
      <S.CustomSpan aria-describedby={open ? "simple-popover" : undefined} onClick={handleClick}>
        <IconWrapper>filter</IconWrapper>
      </S.CustomSpan>
      <Popover
        id={open ? "simple-popover" : undefined}
        open={open}
        anchorEl={popoverOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <S.PopoverText onClick={handleClose}>All</S.PopoverText>
        <S.PopoverText onClick={handleClose}>With Member</S.PopoverText>
        <S.PopoverText onClick={handleClose}>Without Member</S.PopoverText>
      </Popover>

      <IconWrapper>sort</IconWrapper>
      <S.CustomButton
        onClick={() => {
          if (props.addModalHandler) props.addModalHandler();
        }}
      >
        Add
      </S.CustomButton>
    </S.RightSectionContainer>
  );
};

export default RightSection;

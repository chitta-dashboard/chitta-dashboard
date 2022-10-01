import React, { useState, FC } from "react";
import { Popover } from "@mui/material";
import IconWrapper from "../../../utils/iconWrapper";
import S from "./rightSection.styled";

interface RightSectionProps {
  addModalHandler?: () => void;
  sortHandler?: (sortOrder: "ascending" | "descending") => void;
  sortFilter?: "ascending" | "descending";
}

const RightSection: FC<RightSectionProps> = ({ addModalHandler, sortFilter, sortHandler }) => {
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
      <IconWrapper aria-describedby={open ? "simple-popover" : undefined} onClick={handleClick}>
        filter
      </IconWrapper>
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

      <IconWrapper
        isGreen={sortFilter === "descending"}
        onClick={() => {
          sortHandler && sortHandler(sortFilter === "ascending" ? "descending" : "ascending");
        }}
        tooltip={sortFilter}
      >
        sort
      </IconWrapper>
      <S.CustomButton
        onClick={() => {
          addModalHandler && addModalHandler();
        }}
      >
        Add
      </S.CustomButton>
    </S.RightSectionContainer>
  );
};

export default RightSection;

import { FC } from "react";
import S from "./popover.styled";

interface IPopOverOptions {
  id: string;
  name: string;
}

interface IPopoverProps {
  id: string;
  value?: any;
  onSelectHandler: (value: string) => void;
  isOpen: HTMLElement | null;
  onPopCloseHandler: () => void;
  popOverOptions?: IPopOverOptions[];
}

const PopOver: FC<IPopoverProps> = (props) => {
  //constants
  const { id, value, isOpen, onPopCloseHandler, popOverOptions, onSelectHandler } = props;

  return (
    <S.Pop
      id={id}
      open={Boolean(isOpen)}
      anchorEl={isOpen}
      onClose={onPopCloseHandler}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {popOverOptions?.map((option) => (
        <S.Option key={option.id} onClick={() => onSelectHandler(option.name)} select={value === option.name}>
          {option.name}
        </S.Option>
      ))}
    </S.Pop>
  );
};

export default PopOver;

import Props from "../../modals/type/modalProps";
import MultiSelect from "./multiSelectField";

const MultipleSelectChip = (props: Props) => {
  return (
    <>
      <MultiSelect openModal={props.openModal} label={props.multiSelectLabel} />
    </>
  );
};
export default MultipleSelectChip;

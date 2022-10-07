interface CommonModalProps {
  check?: string;
  open: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
  generateIdCard?: () => void;
  handleDelete?: () => void;
  handleEdit?: () => void;
  generateFarmerDetailForm?: () => void;
  handleCheck?: () => void;
}
export default CommonModalProps;

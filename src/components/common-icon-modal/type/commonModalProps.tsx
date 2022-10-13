interface CommonModalProps {
  check?: string;
  open: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
  generateIdCard?: () => void;
  handleDelete?: () => void;
  handleEdit?: () => void;
  generateFarmerDetailForm?: () => void;
  handleConfirm?: () => void;
}
export default CommonModalProps;

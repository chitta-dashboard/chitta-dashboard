interface CommonModalProps {
  check?: string;
  open: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
  handleDelete?: () => void;
  handleIdCard?: () => void;
  handleEdit?: () => void;
  generateFarmerDetailForm?: () => void;
  handleConfirm?: () => void;
}
export default CommonModalProps;

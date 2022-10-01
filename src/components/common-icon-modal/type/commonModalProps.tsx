interface CommonModalProps {
  open: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
  generateIdCard?: () => void;
  handleDelete?: () => void;
  handleEdit?: () => void;
  generateFarmerDetailForm?: () => void;
}
export default CommonModalProps;

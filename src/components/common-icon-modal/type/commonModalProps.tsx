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
  handlePdfDownload?: () => void;
  deleteicon?: number;
}
export default CommonModalProps;

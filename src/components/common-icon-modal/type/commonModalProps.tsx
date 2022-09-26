interface CommonModalProps {
  open: boolean;
  handleClose: any;
  children?: React.ReactNode;
  generateIdCard?: () => void;
  generateFarmerDetailForm?: () => void;
  // closeIconModal?: any;
  // deleteMdDetails?: (id: number) => void;
  // deleteFarmersGroup?: (id: number) => void;
  // deleteFarmersDetails?: (id: number) => void;
  deleteId?: number;
}
export default CommonModalProps;

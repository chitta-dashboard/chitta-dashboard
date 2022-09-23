interface CommonModalProps {
  open: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
  generateIdCard?: () => void
  generateFarmerDetailForm?:() => void
}
export default CommonModalProps
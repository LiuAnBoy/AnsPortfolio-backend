import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from '@mui/material';
import { PortfolioListProps } from '../../../domain/Portfolio/portfolioListProps';

interface PortfolioModalProps extends PortfolioListProps {
  isOpen: boolean;
  handleClose: () => void;
}

function PortfolioModal({ data, isOpen, handleClose }: PortfolioModalProps) {
  console.log(data);
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle id="responsive-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Disagree
        </Button>
        <Button onClick={handleClose} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PortfolioModal;

import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import type { Breakpoint } from '@mui/material'

import ButtonLoading from 'components/button/loading'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, pb: 2, pl: 2, pr: 8, pt: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface DialogProps {
  children: React.ReactElement
  handleClose: () => void,
  onConfirm?: () => void,
  isFullWidth?: boolean,
  isLoadingConfirmButton?: boolean,
  isOpen: boolean,
  maxWidth?: Breakpoint
  textButtonCancel?: string,
  textButtonConfirm?: string,
  title: string
}
const CustomizedDialogs = ({
  children,
  handleClose,
  onConfirm,
  isOpen,
  isLoadingConfirmButton,
  isFullWidth = false,
  maxWidth = "md",
  textButtonCancel = 'Cancel',
  textButtonConfirm,
  title,
}: DialogProps) => {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby={`dialog-title-${title}`}
      open={isOpen}
      maxWidth={maxWidth}
      fullWidth={isFullWidth}
    >
      <BootstrapDialogTitle id={`dialog-title-${title}`} onClose={handleClose}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
      {(!!textButtonCancel || !!textButtonConfirm) && (
        <DialogActions>
          {!!textButtonCancel && (
            <Button autoFocus onClick={handleClose}>
              {textButtonCancel}
            </Button>
          )}
          {!!textButtonConfirm && (
            <ButtonLoading loading={isLoadingConfirmButton} autoFocus variant="contained" onClick={onConfirm}>
              {textButtonConfirm}
            </ButtonLoading>
          )}
        </DialogActions>
      )}
    </BootstrapDialog>
  );
}

export default CustomizedDialogs

import React, { memo, useContext } from 'react'
import Typography from '@mui/material/Typography'
 
import {
 ConfirmationPopupStateContext,
 ConfirmationPopupDispatchContext,
} from 'app/hoc/withConfirmation'

import DialogBasic from './basic'
 
const ConfirmationPopup = memo(() => {
  const { isOpen, isLoading, title, message, textButtonConfirm, textButtonCancel } = useContext(
    ConfirmationPopupStateContext,
  )
  const { closeConfirmation, onSubmitConfirmation } = useContext(ConfirmationPopupDispatchContext)
 
  return (
    <DialogBasic
      handleClose={closeConfirmation}
      isOpen={isOpen}
      maxWidth="xs"
      isFullWidth
      isLoadingConfirmButton={isLoading}
      onConfirm={onSubmitConfirmation}
      textButtonCancel={textButtonCancel}
      textButtonConfirm={textButtonConfirm}
      title={title}
    >
      <Typography variant="body2">{message}</Typography>
    </DialogBasic>
  )
})
 
export default ConfirmationPopup

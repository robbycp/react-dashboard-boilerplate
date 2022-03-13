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

// import React from 'react'

// import DialogBasic from './basic'

// type Props = {
//   handleClose: () => void,
//   isOpen: boolean,
//   message: string,
//   textButtonConfirm: string,
//   title: string,
// }

// const confirmation = ({
//   handleClose,
//   isOpen,
//   message,
//   textButtonConfirm,
//   title,
// }: Props) => {
//   return (
//     <DialogBasic
//       isOpen={isOpen}
//       title={title}
//       handleClose={handleClose}
//       textButtonConfirm={textButtonConfirm}
//     >
//       <div>
//         {message}
//       </div>
//     </DialogBasic>
//   )
// }

// export default confirmation
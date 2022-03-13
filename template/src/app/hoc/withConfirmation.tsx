/* eslint-disable no-param-reassign */
import React, { createContext, useContext, useMemo, useReducer, useCallback } from 'react'
import produce, { Immutable } from 'immer'
 
import ModalConfirm from 'components/dialog/confirm'
 
export type ConfirmationPopupState = {
  isOpen: boolean
  isLoading?: boolean
  title?: string
  message: string
  textButtonConfirm?: string
  textButtonCancel?: string
  onSubmit?: () => void
  onClose?: () => void
}
 
type OpenConfirmationArgs = Omit<ConfirmationPopupState, 'isOpen'>
 
type ConfirmationPopupAction = {
  type: 'OPEN_CONFIRMATION_POPUP' | 'CLOSE_CONFIRMATION_POPUP'
  payload?: Partial<ConfirmationPopupState>
}
 
export type ConfirmationPopupDispatch = {
  openConfirmation: (args: OpenConfirmationArgs) => void
  closeConfirmation: () => void
  onSubmitConfirmation: () => void
}
 
export type ConfirmationPopupContext = {
  state: Immutable<ConfirmationPopupState>
  dispatch: ConfirmationPopupDispatch
}
 
interface UseConfirmation
  extends Pick<ConfirmationPopupState, 'isOpen'>,
    Omit<ConfirmationPopupDispatch, 'onSubmitConfirmation'> {}
 
// Initial state confirmation popup
const initialState: ConfirmationPopupState = {
 title: 'Confirmation',
 isOpen: false,
 isLoading: false,
 message: '',
 textButtonConfirm: 'Confirm',
 onSubmit: () => {},
 onClose: () => {},
}
 
// Create context for state & dispatch confirmation popup
const ConfirmationPopupStateContext: React.Context<
 Immutable<ConfirmationPopupState>
> = createContext(initialState as Immutable<ConfirmationPopupState>)
 
const ConfirmationPopupDispatchContext = createContext<ConfirmationPopupDispatch>({
 openConfirmation: () => {
   /* */
 },
 closeConfirmation: () => {
   /* */
 },
 onSubmitConfirmation: () => {
   /* */
 },
})
 
// Reducer for manage state confirmation popup
const reducer = produce((draft: ConfirmationPopupState, action: ConfirmationPopupAction) => {
 const { type, payload = {} } = action
 switch (type) {
   case 'OPEN_CONFIRMATION_POPUP':
     Object.keys(draft).forEach((objKey) => {
       const key = objKey as keyof ConfirmationPopupState
       ;(draft as any)[key] = payload[key] || initialState[key]
     })
     draft.isOpen = true
     return
   case 'CLOSE_CONFIRMATION_POPUP':
     draft.isOpen = false
     return
   default:
     throw new Error('Unknown action type')
 }
})
 
// Custom hooks method confirmation popup
const useConfirmationPopup = (): ConfirmationPopupContext => {
 const [state, dispatch] = useReducer(reducer, initialState)
 const { onClose, onSubmit, ...popupProps } = state
 
 const openConfirmation = useCallback((args: OpenConfirmationArgs) => {
   dispatch({
     type: 'OPEN_CONFIRMATION_POPUP',
     payload: { ...args },
   })
 }, [])
 
 const closeConfirmation = useCallback(() => {
   if (typeof onClose === 'function') onClose()
   dispatch({
     type: 'CLOSE_CONFIRMATION_POPUP',
   })
 }, [onClose])
 
 const onSubmitConfirmation = useCallback(() => {
   if (typeof onSubmit === 'function') onSubmit()
   closeConfirmation()
 }, [closeConfirmation, onSubmit])
 
 return useMemo(
   () => ({
     state: popupProps,
     dispatch: {
       openConfirmation,
       closeConfirmation,
       onSubmitConfirmation,
     },
   }),
   [popupProps, openConfirmation, closeConfirmation, onSubmitConfirmation],
 )
}
 
// HOC to wrap context confirmation popup
const withConfirmation = <P extends Record<string, unknown> = Record<string, unknown>>(
 Component: React.ComponentType<P>,
): React.FC<P> => (props) => {
 const { state, dispatch } = useConfirmationPopup()
 return (
   <ConfirmationPopupDispatchContext.Provider value={dispatch}>
     <ConfirmationPopupStateContext.Provider value={state}>
       <ModalConfirm />
       <Component {...props} />
     </ConfirmationPopupStateContext.Provider>
   </ConfirmationPopupDispatchContext.Provider>
 )
}
 
// Custom hooks for use in other components
const useConfirmation = (): UseConfirmation => {
 const { isOpen } = useContext(ConfirmationPopupStateContext)
 const { onSubmitConfirmation, ...dispatch } = useContext(ConfirmationPopupDispatchContext)
 return { isOpen, ...dispatch }
}
 
export default withConfirmation
export { useConfirmation, ConfirmationPopupStateContext, ConfirmationPopupDispatchContext }
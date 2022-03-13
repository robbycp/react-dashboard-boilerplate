import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type { WritableDraft } from 'immer/dist/internal';
import type { OptionsObject, SharedProps, SnackbarKey, SnackbarMessage } from 'notistack';

interface SnackbarOption {
  message: SnackbarMessage,
  options?: SharedProps & OptionsObject
}
interface SnackbarNotification extends SnackbarOption {
  key: SnackbarKey
  dismissed: boolean
}
export interface SnackbarState {
  notifications: SnackbarNotification[];
}

export const initialState: SnackbarState = {
  notifications: [],
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    enqueueSnackbar: (state, action: PayloadAction<SnackbarOption>) => {
      const key = action.payload.options && action.payload.options.key;
      const jancuk = {
        ...action.payload,
        key: key || new Date().getTime() + Math.random(),
      } as WritableDraft<SnackbarNotification>
      state.notifications = [
        ...state.notifications,
        jancuk,
      ]
    },
    closeSnackbar: (state, action: PayloadAction<{ key: string, dismissAll: boolean }>) => {
      state.notifications = state.notifications.map(notification => (
        (action.payload.dismissAll || notification.key === action.payload.key)
            ? { ...notification, dismissed: true }
            : { ...notification }
      ))
    },
    removeSnackbar: (state, action: PayloadAction<{ key: SnackbarKey }>) => {
      state.notifications = state.notifications.filter(
        notification => notification.key !== action.payload.key,
      )
    },
  },
});

export const {
  enqueueSnackbar,
  closeSnackbar,
  removeSnackbar,
} = snackbarSlice.actions;

export default snackbarSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

export interface AppState {
  statusInitial: 'idle' | 'loading' | 'done';
}

export const initialState: AppState = {
  statusInitial: 'idle',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    appStartCheck: state => {
      state.statusInitial = 'loading';
    },
    appStartCheckFailed: state => {
      state.statusInitial = 'done';
    },
    appStartCheckSuccess: state => {
      state.statusInitial = 'done';
    },
  },
});

export const {
  appStartCheck,
  appStartCheckFailed,
  appStartCheckSuccess,
} = appSlice.actions;

export default appSlice.reducer;

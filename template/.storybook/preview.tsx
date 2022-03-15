import React from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { ThemeProvider } from 'emotion-theming';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from "react-router-dom";

import theme from '../src/app/styles/theme';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

import initializeStore from '../src/app/redux';

const { store, persistor } = initializeStore()

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <MUIThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
              <Story />
            </ThemeProvider>
          </MUIThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  ),
];
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { PersistGate } from 'redux-persist/integration/react'
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query'

import initializeStore from 'app/redux';
import { config } from 'app/config/react-query-config'

import Routes from './RootRoutes'
import theme from './styles/theme';

const { store, persistor } = initializeStore()

// Create a client
const queryClient = new QueryClient(config)

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={theme}>
                <SnackbarProvider>
                  <CssBaseline />
                  <Routes />
                </SnackbarProvider>
              </ThemeProvider>
            </QueryClientProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

export default App;

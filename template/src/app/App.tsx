import React from 'react';
import { Provider } from 'react-redux';

import Home from 'pages/home'
import { store } from 'app/store';
import './App.css';

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Home />
      </Provider>
    </React.StrictMode>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import PwApiService from './services/pw-api-service';
import { PwApiProvider } from './components/contexts/pwApiContext';

import store from './store';

const pwApi = new PwApiService();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <PwApiProvider value={pwApi}>
          <App />
        </PwApiProvider>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
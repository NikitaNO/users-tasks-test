import * as React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppContainer from './components/AppContainer';
import Users from './components/Users';

const Root = () => (
  <Provider store={store}>
    <AppContainer>
      <Users />
    </AppContainer>
  </Provider>
);

export default Root;

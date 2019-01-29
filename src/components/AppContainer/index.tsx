import * as React from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';

const AppContainer =
  ({ children }) => (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Users/Tasks App
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );

export default AppContainer;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import { Employer, Landing, Student } from './routes';

const App = () => {
  return (
    <div>
      <AppLayout>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/student/:email">
            <Student />
          </Route>
          <Route path="/employer/:email">
            <Employer />
          </Route>
        </Switch>
      </AppLayout>
    </div>
  );
};

export default App;

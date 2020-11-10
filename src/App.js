import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Employer, Landing, Student } from './routes';

const App = () => {
  // NOTE: Insert layout components here
  return (
    <div>
      App
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
    </div>
  );
};

export default App;

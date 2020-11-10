import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { EmployerJob, EmployerJobCreate } from '.';

const Employer = () => {
  const { path } = useRouteMatch();
  return (
    <div>
      Employer
      <Switch>
        <Route exact path={`${path}/`}>
          <div>Employer Main</div>
        </Route>
        <Route exact path={`${path}/job/create`}>
          <EmployerJobCreate />
        </Route>
        <Route path={`${path}/job/:jobId`}>
          <EmployerJob />
        </Route>
      </Switch>
    </div>
  );
};

export default Employer;

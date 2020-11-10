import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { EmployerJob, EmployerJobCreate } from '.';
import { EmployerMain } from '../pages';

const Employer = () => {
  const { path } = useRouteMatch();
  return (
    <div>
      Employer
      <Switch>
        <Route exact path={`${path}/`}>
          <EmployerMain />
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

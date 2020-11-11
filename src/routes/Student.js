import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { StudentApplication, StudentApplyJob } from '../pages';

const Student = () => {
  const { path } = useRouteMatch();

  return (
    <div>
      Student
      <Switch>
        <Route exact path={`${path}/`}>
          <div>Student Main</div>
        </Route>
        <Route path={`${path}/application/:applicationId`}>
          <StudentApplication />
        </Route>
        <Route path={`${path}/apply/:jobId`}>
          <StudentApplyJob />
        </Route>
      </Switch>
    </div>
  );
};

export default Student;

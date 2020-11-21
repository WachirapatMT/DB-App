import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { StudentApplication, StudentApplyJob } from '../pages';
import { Button } from 'antd';
import StudentApplicationList from '../components/StudentApplicationList';
const Student = () => {
  const { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={`${path}/`}>
          <StudentApplicationList />
        </Route>
        <Route exact path={`${path}/application/:applicationId`}>
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

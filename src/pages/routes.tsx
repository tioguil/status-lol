import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const HomeRoute = lazy(() => import("./home/home"));

const Routes = () => {
  return(
    <BrowserRouter>
      <Suspense fallback={<CircularProgress />}>
        <Switch>
          <Route exact path="/" component={()=> <HomeRoute/>} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default Routes;
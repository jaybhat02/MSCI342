import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home/Home';
import history from './history';
import SignUp from '../SignUp/SignUp';
import SignIn from "../SignIn/SignIn";
import AddSession from "../AddSession/AddSession";
import Previous from "../Previous/Previous";

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route exact path="/" component={SignIn}/>
      <Route path="/Home" exact component={Home} />
      <Route path="/AddSession" exact component={AddSession} />
      <Route exact path="/SignUp" component={SignUp}/>
      <Route exact path="/Previous" component={Previous}/>
      </Switch>
    </Router>
  );
}
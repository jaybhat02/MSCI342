import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home/Home';
import history from './history';
import SignUp from '../SignUp/SignUp';
import SignIn from "../SignIn/SignIn";
import Upcoming from '../Upcoming/Upcoming';
import AddSession from "../AddSession/AddSession";

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
      <Route exact path="/Upcoming" component={Upcoming}/>
      </Switch>
    </Router>
  );
}
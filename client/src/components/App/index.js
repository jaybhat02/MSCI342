import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Home from '../Home/Home';
import PrivateRoute from '../Navigation/PrivateRoute.js';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //
    };
  }

  componentDidMount() {
    //
  }


  componentWillUnmount() {
    this.listener();
  }


  render() {
    return (
	  <Router>
	   
      <div>
        <PrivateRoute exact path="/" component={SignIn}/>
      </div>
	  </Router>
    );
  }
}

export default App;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import history from '../Navigation/history';
import "./Home.css";

import { ThemeProvider, styled } from '@material-ui/core/styles';
import SessionList from '../SessionList/SessionList';
import AddSession from '../AddSession/AddSession';
import Navbar from '../Navbar/Navbar';
import { max } from 'moment';

//Dev mode
const serverURL = ""; //enable for dev mode

//Hello this is Adnan's change
//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;



const lightTheme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "#ffffff"
    },
    primary: {
      main: '#2196f3',

      dark: '#ba6b6c',
      background: '#e1f1fd'
    },
    secondary: {
      main: "#b71c1c",
      light: '#f05545',
      dark: '#7f0000'
    },
  },
  typography: {
    fontFamily: ["Open Sans, sans-serif"].join(",")
  }
});

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "20vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },

});



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0
    }
  };





  componentDidMount() {
    //this.loadUserSettings();
  }


  loadUserSettings() {
    this.callApiLoadUserSettings()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  startUp = async () => {

  }


  render() {
    // const [profile,setProfile]=React.useState();
    // setProfile(JSON.parse(localStorage.getItem("profile")));
    // console.log(profile);
    // localStorage.clear();
    let Profile = localStorage.getItem("profile");

    console.log(JSON.parse(Profile));
    // setProfile(getProfile);
    // console.log(profile);
    return (
      <div>
        <Review />
      </div>
    );
  }
}
const Review = () => {
  const [profile, setProfile] = React.useState();

  const startUp = async () => {
    let tempProfile = localStorage.getItem("profile");
    let pp = JSON.parse(tempProfile);
    console.log(pp);
    if (pp != null) {
      console.log(pp[0]);
      setProfile(pp[0])
    }

    return pp;
  }

  React.useEffect(() => {
    let pp = startUp().then((peps) => {
      console.log("hello aneodjbnabjkdbjkabwldnaw");
      console.log(peps);
      if (peps == null) {
        console.log("its emptyyyyyyyyy")
        history.push("/");
      }
    })
  }, []);
  return (
    <ThemeProvider theme={lightTheme}>
      <Navbar profile={profile}/>
      <Container maxWidth style={{ overflow: 'scroll', backgroundColor: "rgb(253, 253, 253)", position: 'fixed', width: '100%', height: '100%' }}>
        <Grid container spacing={3} style={{ padding: '25px' }} >
          <Grid item xs={12}>

            <Typography id='head'>
              GameTime
            </Typography>

          </Grid>

          <Grid item xs={12}>
            <AddSession profile={profile} />
          </Grid>

          <Grid item xs={12}>
            <SessionList profile={profile} />
          </Grid>



        </Grid >
      </Container>
    </ThemeProvider>
  );
}


Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);

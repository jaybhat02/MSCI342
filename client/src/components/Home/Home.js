import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { ThemeProvider, styled } from '@material-ui/core/styles';
import SessionList from '../SessionList/SessionList';
import AddSession from '../AddSession/AddSession';
import Navbar from '../Navbar/Navbar';

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
  React.useEffect(() => {
    let tempProfile = localStorage.getItem("profile");
    console.log(JSON.parse(tempProfile)[0]);
    setProfile(JSON.parse(tempProfile)[0])
  }, []);
  return (
    <ThemeProvider theme={lightTheme}>
      <Navbar />
      <Grid container spacing={3} style={{ padding: '25px' }}>

        <Grid item xs={12}>

          <Typography variant="h3" color='secondary' style={{
            textAlign: 'center',
          }}>
            GameTime
          </Typography>

        </Grid>

        <Grid item xs={12}>
          <AddSession profile={profile}/>
        </Grid>

        <Grid item xs={12}>
          <SessionList profile={profile}/>
        </Grid>



      </Grid >

    </ThemeProvider>
  );
}


Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);

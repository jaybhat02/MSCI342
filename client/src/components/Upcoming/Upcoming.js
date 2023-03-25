import * as React from 'react';
import history from '../Navigation/history';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Navbar from '../Navbar/Navbar';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import DetailSession from '../DetailSession/DetailSession';

//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3049";
const serverURL = "";

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
            main: "rgb(251, 178, 0)",
            light: '#f05545',
            dark: '#7f0000'
        },
    },
    typography: {
        fontFamily: ["Open Sans, sans-serif"].join(",")
    }
});

const Upcoming = () => {
    const [loading, setLoading] = React.useState(true);
    const [upcomingList, setUpcomingList] = React.useState([])
    const [profile, setProfile] = React.useState();


    const startUp = async () => {
        let tempProfile = localStorage.getItem("profile");
        let pp = JSON.parse(tempProfile);
        console.log(pp);
        if (pp != null) {
            console.log(pp[0]);
            setProfile(pp[0])
            loadUpcomingSessions(pp[0]);
        }

        return pp;
    }

    React.useEffect(() => {
        let pp = startUp().then((peps) => {
            console.log("hello");
            console.log(peps);
            if (peps == null) {
                console.log("its emptyyyyyyyyy")
                history.push("/");
            }

        })
    }, []);

    const callApiLoadUserSessions = async () => {
        const url = serverURL + "/api/getUserSessions";
        console.log(url);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    const callApiLoadUpcomingSessions = async (profile_id) => {
        const url = serverURL + "/api/getUpcomingSessions";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: profile_id,
            }),
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    const loadUpcomingSessions = (profile_id) => {
        callApiLoadUpcomingSessions(profile_id)
            .then(res => {
                var upcomingSessionList = res.results;
                console.log(upcomingSessionList);
                callApiLoadUserSessions()
                    .then(res => {
                        var upcomingUserSessionList = res.results;
                        for (var session in upcomingSessionList) {
                            var targetID = upcomingSessionList[session].session_id;
                            upcomingSessionList[session].players = [];
                            for (var user in upcomingUserSessionList) {
                                if (upcomingUserSessionList[user].session_id === targetID) {
                                    upcomingSessionList[session].players.push(upcomingUserSessionList[user]);
                                }
                            }
                        }

                        setLoading(false);
                        setUpcomingList(upcomingSessionList);
                    })
            })
    }

    return (
        <ThemeProvider theme={lightTheme}>
            <Navbar />
            <Container maxWidth style={{ overflow: 'scroll', backgroundColor: "rgb(253, 253, 253)", position: 'fixed', width: '100%', height: '100%' }}>
                <Grid container spacing={3} style={{ padding: '25px' }} >
                    <Grid item xs={12}>
                        <Box sx={{ textAlign: 'right', textAlign: 'center', padding: '10px' }}>
                            <Typography id='head'>
                                Upcoming Sessions
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={6} style={{ marginTop: 50, textAlign: 'center' }} id="container">
                            {upcomingList.map((item) => {
                                return (
                                    <Grid item sm={4}>
                                        <CardContent id="containersmall">
                                            <Typography variant="h5" component="h2">
                                                {item.sport}
                                            </Typography>
                                            <Typography color="textSecondary" >
                                                {item.level}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                {item.location} on {new Intl.DateTimeFormat('en-GB', { month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", hour12: true }).format(new Date(item.date_and_time))}
                                            </Typography>
                                            <Box marginTop={2} >
                                                <DetailSession item={item} profile={{ user_id: 14 }} type={'å'} />
                                            </Box>
                                        </CardContent>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                    å
                    {loading && (
                        <Box sx={{ textAlign: 'center', textAlign: 'center', }} width='100%'>
                            <CircularProgress color='secondary' />
                        </Box>
                    )}

                </Grid >
            </Container>
        </ThemeProvider >
    )
}


export default Upcoming;
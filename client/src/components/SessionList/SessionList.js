import * as React from 'react';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Filter from '../Filter/Filter';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import "./SessionList.css";
import DetailSession from '../DetailSession/DetailSession';

//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3049";
const serverURL = "";

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.background,
    padding: 8,
    borderRadius: 4,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
}));

const lightTheme = createTheme({
    palette: {
        type: 'light',
        background: {
            default: "#ffffff"
        },
        primary: {
            main: '#2196f3',
            dark: '#ba6b6c',
            background: '#e8d596'
        },
        secondary: {
            main: "#FFD700",
            light: '#f05545',
            dark: '#7f0000'
        },
    },
});

const SessionList = (props) => {
    const [sessionList, setSessionList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [originalSessionList, setOriginalSessionList] = React.useState([]);
    const [filters, setFilters] = React.useState();
    const [reset, setReset] = React.useState(false);


    React.useEffect(() => {
        loadSessions();
    }, []);


    const loadSessions = () => {
        callApiLoadSessions()
            .then(res => {
                var sessionList = res.results;

                callApiLoadUserSessions()
                    .then(res => {
                        var userSessionList = res.results;
                        for (var session in sessionList) {
                            var targetID = sessionList[session].session_id;
                            sessionList[session].players = [];
                            for (var user in userSessionList) {
                                if (userSessionList[user].session_id === targetID) {
                                    sessionList[session].players.push(userSessionList[user]);
                                }
                            }
                        }
                        console.log(sessionList);
                        setLoading(false);
                        setOriginalSessionList(sessionList);
                        setSessionList(sessionList);
                    })
            })
    }

    const handleSeach = () => {
        console.log(filters)
        var modifiedList = originalSessionList;
        const filteredRows = modifiedList.filter((row) => {
            for (var key in filters) {
                if (key == "date_and_time") {
                    if (!sameDay(row[key], filters[key])) {
                        return false;
                    }
                } else if (row[key] === undefined || row[key].toLowerCase() != filters[key].toLowerCase()) {
                    return false;
                }
            }
            return true;
        });
        setSessionList(filteredRows);
    };

    const handleReset = () => {
        setReset(true);
        setSessionList(originalSessionList);
    };

    const callApiLoadSessions = async () => {
        const url = serverURL + "/api/getSessions";
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

    function sameDay(date1, date2) {
        var d1 = new Date(date1)
        var d2 = new Date(date2)
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate() + 1;
    }

    return (
        <ThemeProvider theme={lightTheme}>
            <Box sx={{ textAlign: 'right' }}>
                <Box sx={{ marginRight: '10px' }} display='inline'>
                    <Filter setFilters={setFilters} reset={reset} setReset={setReset} />
                </Box>
                <Box sx={{ marginRight: '10px' }} display='inline'>
                    <Button variant="contained" color="primary" onClick={handleSeach}> Search </Button>
                </Box>
                <Box sx={{ marginRight: '10px' }} display='inline'>
                    <Button variant="outlined" color="primary" onClick={handleReset}> Reset </Button>
                </Box>
            </Box>
            {loading && (
                <Box sx={{ textAlign: 'center' }} width='100%'>
                    <CircularProgress color='secondary' />
                </Box>
            )}
            <List list={sessionList} profile={props.profile} />

        </ThemeProvider>
    )
}
const List = (props) => {

    return (
        <Grid container spacing={6} style={{ marginTop: 50, textAlign: 'center' }} id="container">
            {props.list.map((item) => {
                return (
                    <Grid item sm={4} >
                        <CardContent id="containersmall">
                            <Typography variant="h5" component="h2">
                                {item.sport}
                            </Typography>
                            <Typography color="textSecondary" >
                                {item.level}
                            </Typography>
                            <Typography color="textSecondary">
                                {item.location} at {item.date_and_time}
                            </Typography>
                            <Box marginTop={2} >
                                <DetailSession item={item} profile={props.profile} />
                            </Box>
                        </CardContent>
                    </Grid>
                );
            })}
        </Grid >
    )
}

export default SessionList;
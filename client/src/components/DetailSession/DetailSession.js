import * as React from 'react';
import { createTheme, ThemeProvider, makeStyles, withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


import "./DetailSession.css";

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
});

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);

const DetailSession = (props) => {
    const [open, setOpen] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [openError, setOpenError] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleJoin = () => {
        if (canJoin()) {
            setOpen(false);
            joinSessions();
        } else {
            setOpenError(true);
        }
    };

    React.useEffect(() => {
        var playersJoined = props.item.players;
        setProgress((playersJoined.length / props.item.max_players) * 100)
    }, []);

    const callApiJoinSessions = async () => {
        const url = serverURL + "/api/joinSession";
        console.log(url);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: [props.item.session_id, props.profile.user_id],
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    const joinSessions = () => {
        callApiJoinSessions()
            .then(res => {
                setOpenSuccess(true);
            })
    }
    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            setOpenError(false);
        }

        setOpenError(false);
    };
    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            setOpenSuccess(false);
        }

        setOpenSuccess(false);
    };
    const canJoin = () => {
        var userID = props.profile.user_id;
        var maxPlayers = props.item.max_players;
        if (maxPlayers <= props.item.players.length) return false;
        for (var player in props.item.players) {
            console.log(props.item.players[player]);
            if (props.item.players[player].user_id === userID) return false;
        }
        return true;
    };

    return (
        <ThemeProvider theme={lightTheme}>
            <Button variant="outlined" data-testid="addSessionButton" onClick={handleClickOpen} style={{ backgroundColor: "rgb(251, 178, 0)", color: "#000000" }}>
                View Details
            </Button>
            <Dialog open={open} fullWidth >

                <DialogContent>
                    <Typography variant="h4" component="h2">
                        {props.item.sport}
                    </Typography>
                    <Typography variant="body1">
                        {props.item.level}
                    </Typography>
                    <Typography variant="body1">
                        {props.item.location}
                    </Typography>
                    <Typography variant="body1">
                        {new Intl.DateTimeFormat('en-GB', { weekday: "short", year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", hour12: true }).format(new Date(props.item.date_and_time))}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Desciption: {props.item.session_description}
                    </Typography>

                    <Box display="flex" alignItems="center" margin={1}>
                        <Box width="100%" >
                            <BorderLinearProgress variant="determinate" value={progress} />
                        </Box>
                        <Box minWidth={35}>
                            <Typography variant="body2" color="textSecondary">{props.item.players.length}/{props.item.max_players}</Typography>
                        </Box>
                    </Box>
                    {props.item.players.length == 0 ?
                        null
                        :
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">
                                Players Joined
                            </Typography>
                            {props.item.players.map((person) => {
                                return (
                                    <ListItemText
                                        primary={person.first_name + " " + person.last_name}
                                        secondary={person.user_email}
                                    />
                                );
                            })}
                        </Grid>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} data-testid="closeButton" style={{ backgroundColor: "rgb(251, 178, 0)", color: "#000000" }}>Close</Button>
                    <Button onClick={handleJoin} data-testid="closeButton" style={{ backgroundColor: "#000000", color: "rgb(251, 178, 0)" }}>Join</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleErrorClose}>
                <MuiAlert onClose={handleErrorClose} severity="error">
                    Cannot join session!
                </MuiAlert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleSuccessClose}>
                <MuiAlert onClose={handleSuccessClose} severity="success">
                    Joined session successfully!
                </MuiAlert>
            </Snackbar>

        </ThemeProvider >
    )
}

export default DetailSession;
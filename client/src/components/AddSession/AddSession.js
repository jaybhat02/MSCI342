import * as React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

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
import Chip from '@material-ui/core/Chip';

import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

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
            main: "#ffd700",
            light: '#f05545',
            dark: '#7f0000'
        },
    },
});

const AddSession = (props) => {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState();
    const [maxPlayers, setMaxPlayers] = React.useState(2);
    const [description, setDescription] = React.useState('');
    const [sport, setSport] = React.useState();
    const [location, setLocation] = React.useState();
    const [level, setLevel] = React.useState();
    const [requiredField, setRequiredField] = React.useState(true);

    const sportsList = ['Soccer', 'Basketball', 'Volleyball'];
    const locationList = ['PAC', 'CIF'];
    const levelList = ['Beginner', 'Intermediate', 'Competitive'];
    const postData = { 'sport': null, 'location': null, 'level': null, 'maxPlayers': null, 'description': null, 'date': null};

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDate();
        setMaxPlayers();
        setDescription();
        setSport();
        setLocation();
        setLevel();
        setRequiredField(true);
    };

    const handlePlayerChange = (event, value) => {
        setMaxPlayers(value);
    };

    const handleDescChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSportChange = (event) => {
        setSport(event.target.value);
    };

    const handelLevelChange = (event) => {
        setLevel(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleDateChange = (moment) => {
        setDate(new Date(moment));
    };

    const addSession = (session) => {
        callApiAddSession(session)
            .then(res => {
            })
    }

    const addSessionUser = (sessionID) => {
        callApiAddSessionUser(sessionID)
            .then(res => {
            })
    }

    const callApiAddSession = async (session) => {
        const url = serverURL + "/api/addSession";
        console.log(url);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                data: session,
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log(body);
        addSessionUser(body.sessionID);
        return body;
    }

    const callApiAddSessionUser = async (sessionID) => {
        const url = serverURL + "/api/addSessionUser";
        console.log(url);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                sessionID: sessionID,
                profileID: props.profile,
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log(body);
        return body;
    }

    const handleSubmit = () => {
        console.log("here")
        if (description && maxPlayers && level && location && sport && date) {

            postData.description = description;
            postData.maxPlayers = maxPlayers;
            postData.level = level;
            postData.location = location;
            postData.sport = sport;
            postData.date = date.toLocaleString();
            console.log(postData);
            addSession(postData);
            handleClose();
        } else {
            setRequiredField(false);
        }


    };

    return (
        <ThemeProvider theme={lightTheme}>
            <Button variant="outlined" data-testid="addSessionButton" onClick={handleClickOpen}>
                Add New Game Session
            </Button>
            <Dialog open={open} data-testid="addSessionModal" fullWidth >
                <DialogTitle>Add New Game Session</DialogTitle>
                <DialogContent>
                    <Box sx={{ textAlign: 'center', height: '65vh' }}>
                        <Box sx={{ padding: '2vh' }}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Select Sport</InputLabel>
                                <Select native value={sport} onChange={handleSportChange} label="Select Sport" id="sport" autoWidth>
                                    <option value=""></option>
                                    {sportsList.map((sport) => (
                                        <option key={sport} value={sport}>{sport}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ padding: '2vh' }}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Select Location</InputLabel>
                                <Select native value={location} onChange={handleLocationChange} label="Select Location" id={"location"} autoWidth>
                                    <option value=""></option>
                                    {locationList.map((location) => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ padding: '2vh' }}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Select Level</InputLabel>
                                <Select native value={level} onChange={handelLevelChange} label="Select Level" id={"level"} autoWidth >
                                    <option value=""></option>
                                    {levelList.map((level) => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ padding: '2vh' }}>
                            <InputLabel>Select Date and Time</InputLabel>
                            <Datetime onChange={handleDateChange} value={date} initialValue={new Date()} />
                        </Box>

                        <Box sx={{ padding: '2vh' }}>
                            <InputLabel>Select Max Number of People</InputLabel>
                            <Slider value={maxPlayers} onChange={handlePlayerChange} defaultValue={5} step={1} marks min={2} max={10} valueLabelDisplay="auto" />
                        </Box>

                        <Box sx={{ padding: '2vh' }}>
                            <TextField value={description} id="description" label="Description" onChange={handleDescChange} multiline fullWidth rows={4} />
                        </Box>
                    </Box>

                    <Box sx={{ textAlign: 'center' }} hidden={requiredField}>
                        <Chip color="secondary" data-testid="requiredFields" label="Make sure all fields are filled in" />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} data-testid="closeButton">Cancel</Button>
                    <Button onClick={handleSubmit} data-testid="submitButton">Submit</Button>
                </DialogActions>
            </Dialog>

        </ThemeProvider >
    )
}

export default AddSession;
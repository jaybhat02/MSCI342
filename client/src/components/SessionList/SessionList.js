import * as React from 'react';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';


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

const SessionList = () => {
    const [sessionList, setSessionList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        loadSessions();
    }, []);

    const loadSessions = () => {
        callApiLoadSessions()
            .then(res => {
                console.log(res.results);
                setLoading(false);
                setSessionList(res.results);
            })
    }

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


    return (
        <ThemeProvider theme={lightTheme}>
            {loading && (
            <Box sx={{textAlign:'center'}} width='100%'>
                <CircularProgress color='secondary'/>
            </Box>
            )}
            <List list={sessionList} />
        </ThemeProvider>
    )
}
const List = (props) => {
    return (
        <ul>
            {props.list.map((item) => {
                return (
                    <StyledPaper style={{
                        width: '94%',
                    }} key={item.title}>
                        <CardContent>
                            <Typography color="textSecondary" >
                                {item.level}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {item.sport}
                            </Typography>
                            <Typography color="textSecondary">
                                {item.location} at {item.date_and_time}: MAX {item.max_players} Players
                            </Typography>
                            <Typography variant="body2" component="p">
                                Desciption: {item.session_description}
                            </Typography>
                        </CardContent>
                    </StyledPaper>
                );
            })}
        </ul>
    )
}

export default SessionList;
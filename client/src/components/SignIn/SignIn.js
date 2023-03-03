import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import history from '../Navigation/history'


const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    black: createColor('#000000')
  },
});



export default function SignIn() {  
  const [eError, setEError] = React.useState(false);
  const [pError, setPError] = React.useState(false);
  const [snackError,setSnackError] = React.useState(false);

  const handleClose = () => {
    setSnackError(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let x = data.get('email');
    let y = data.get('password');
    if (x == "" && y=="") {
      setEError(true);
      setPError(true);
      setSnackError(true);
      return false;
    }
    if (x == "") {
      setEError(true);
      setPError(false);
      setSnackError(true);
      return false;
    }
    if (y == "") {
      setEError(false);
      setPError(true);
      setSnackError(true);
      return false;
    }
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    history.push('/Home')
 
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#000000' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              error={eError}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              error={pError}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="black"
              sx={{ mt: 3, mb: 2 , color:'#FFD700'}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
                
              </Grid>
            </Grid>
            <Grid container>
            <Snackbar open={snackError} onClose={handleClose} autoHideDuration={3000} anchorOrigin={{ vertical:'bottom', horizontal:'center' }} key={'bottom' + 'center'}>
              <Alert variant="filled" severity="error">Please fill out missing fields</Alert>
            </Snackbar>
            </Grid>
           
          </Box>
        </Box>
     
      </Container>
    </ThemeProvider>
  );
}
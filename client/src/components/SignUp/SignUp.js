import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import history from '../Navigation/history'

const serverURL = "";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    black: createColor('#000000')
  },
});

const postData = { 'firstName': null, 'lastName': null, 'email': null, 'password': null, 'gender': null };


export default function SignUp() {
  const [error, setError] = React.useState(false);
  const [snackError, setSnackError] = React.useState(false);

  const handleClose = () => {
    setSnackError(false);
  }

  const signUp = (signUp) => {
    callApiSignUp(signUp)
        .then(res => {
        })
}

const callApiSignUp = async (signUp) => {
    const url = serverURL + "/api/signUp";
    console.log(url);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            //authorization: `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
            data: signUp
        })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log('something')
    return body;
}

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    let x = data.get('email');
    let y = data.get('password');
    let z = data.get('firstName');
    let w = data.get('lastName');
    let v = data.get('gender');
    if (x == "" || y == "" || z == "" || w == "" || v == null) {
      setError(true);
      setSnackError(true);
      return false;
    }
    postData.firstName = z;
    postData.lastName = w;
    postData.email = x;
    postData.password = y;
    postData.gender = v;
    console.log(postData);
    history.push('/')
    signUp(postData);
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  error={error}

                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  error={error}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={error}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={error}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  error={error}
                  name="gender"
                  label="gender"
                  id="gender"
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="black"
              sx={{ mt: 3, mb: 2, color: '#FFD700' }}
              data-testid="submitButton"
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
              <Grid item>
                <Snackbar open={snackError} onClose={handleClose} autoHideDuration={3000} >
                  <Alert variant="filled" severity="error" data-testid="requiredAlert">Please fill out missing fields</Alert>
                </Snackbar>
              </Grid>
            </Grid>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
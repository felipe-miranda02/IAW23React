import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link as RouteLink, useNavigate} from "react-router-dom";
import { useState, useContext, useEffect } from 'react'; 
import axios from "axios";
import { MyContext } from './MyContext'; 
import Swal from 'sweetalert2';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
const apiUrl ='http://127.0.0.1:8000/api/clientes/signin'

export default function SignIn() {
  const {user, setUser} = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  useEffect(()=>{
    if(user.email != '')
    {
        history("/")
    }
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const signin = (e) => {
    e.preventDefault();
    axios.post(apiUrl, {
      email: email,
      password: password
  })
  .then(function (response){
      console.log(response.data);
      if(response.data.error != null){
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.data.error,
          });
      }else{
          const updatedUser = {
              ...user,
              name: response.data.name,
              email: response.data.email
          };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          history("/");
      }
  })
  .catch(function (error){
      console.log(error)
  })
  }

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              value = {email}
              onChange={e=>setEmail(e.target.value)} 
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value = {password}
              onChange={e=>setPassword(e.target.value)} 
              margin="normal"
              required
              fullWidth
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
              sx={{ mt: 3, mb: 2 }}
              onClick={signin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <RouteLink to="/signup">
                  {"Don't have an account? Sign Up"}
                </RouteLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
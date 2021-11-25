import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Mi sitio web
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

    const [correo,setCorreo]=useState('')
    const [contrasena,setContrasena]=useState('')
    

    //logica realizada manual
    const login=async(e)=>{
      e.preventDefault();
      const usuario={correo,contrasena}
      const respuesta= await Axios.post('/jefe/login',usuario);
      console.log(respuesta);
      const mensaje=respuesta.data.mensaje
      if(mensaje!=='Bienvenido')
      {
          


          Swal.fire({
            
          icon: 'error',
          title: mensaje,
          showConfirmButton: false,
          timer: 1500
            });


          //   Swal.fire(
          //     'Good job!',
          //     'You clicked the button!',
          //     'success'
          //   )

      }

      else{

          const token= respuesta.data.token
          const nombre= respuesta.data.nombre
          const idusuario=respuesta.data.id
          sessionStorage.setItem('token',token)
          sessionStorage.setItem('nombre',nombre)
          sessionStorage.setItem('idusuario',idusuario)
          window.location.href='/index'

          // Swal.fire({
            
          //     icon: 'success',
          //     title: mensaje,
          //     showConfirmButton: false,
          //     timer: 1500
          //       })

      }

  }



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setCorreo(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>setContrasena(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
           
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
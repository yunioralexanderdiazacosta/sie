import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import SnackbarComponent from '../components/ui/SnackbarComponent';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useFormLogin} from '../hooks/useFormLogin';
import LoginServices from '../services/LoginServices';
import LinearProgress from '@material-ui/core/LinearProgress';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Desarrollado por '}
      ARMV
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  large: {
    width: theme.spacing(15),
    // height: theme.spacing(7),
  },
}));

export default function Login() {
  const formEmpity = {
    identifier: '',
    password: '',
  };
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [values, handleInputChange, reset] = useFormLogin(formEmpity);
  const {identifier, password} = values;
  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      LoginServices.login(values)
        .then((response) => {
          localStorage.setItem('loggedin', response.data.jwt);
          setIsLoading(false);
          console.log(response.status);
          console.log(response.data.jwt);
          //   reset();
          history.push('/');
        })
        .catch((e) => {
          setIsLoading(false);
          reset();
          setOpen(true);
          console.log(e);
          console.log('ssss');
        });
    }, 1000);
  };

  return (
    <>
      {isLoading && <LinearProgress />}
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <img
            alt='Logo'
            src='http://sie-sa.com/images/gts/logos/logomediano.png'
            className={classes.large}
          />
          <br></br>
          <Typography component='h1' variant='h5'>
            Iniciar Sesión
          </Typography>
          <form className={classes.form} noValidate autoComplete='off'>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Usuario o Email'
              name='identifier'
              autoComplete='email'
              autoFocus
              onChange={handleInputChange}
              value={identifier}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Contraseña'
              type='password'
              autoComplete='current-password'
              onChange={handleInputChange}
              value={password}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={handleSubmit}
              disabled={isLoading ? true : false}
            >
              Entrar
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      <SnackbarComponent open={open} setOpen={setOpen} />
    </>
  );
}

import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import {useForm} from '../../hooks/useForm';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import BombeoServices from '../../services/BombeoServices';
import LinearProgress from '@material-ui/core/LinearProgress';
import AlertComponent from '../ui/AlertComponent';
// import TableBombeo from './TableBombeo';

import Slide from '@material-ui/core/Slide';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {Grid, Paper} from '@material-ui/core';

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: '25ch',
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function FormCustomer({
  setNewCustomer,
  open,
  setOpen,
  formEmpity,
  setFormEmpity,
  idCustomer,
  setIdCustomer,
  titleDialog,
  setTitleDialog,
}) {
  const [scroll, setScroll] = useState('paper');
  const [isLoading, setIsLoading] = useState(false);
  const [optionsAlert, setOptionsAlert] = useState({
    show: false,
    severity: 'success',
    msj: 'Guardado con éxito!',
  });
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const {current: descriptionElement} = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const [values, handleInputChange, reset] = useForm(formEmpity);

  const {
    nombre,
    municipio,
    empresa,
    telefono,
    email,
    comunidad,
    altitud,
    lat,
    long,

    aplicacion,
    req_diario_agua,
    req_esp_temporada,
    uso_agua_potable,
    tanque_almacenamiento,
    tipo_sembradio,
    equipo_riego,
    fuente_agua_bomb,
    var_nivel_agua,
    temp_agua,
    calidad_agua,
    vel_recuperacion,
    diametro_pozo,
    profundidad_pozo,
    profundidad_agua,
    ubi_filtros,
    dispone_camaras,
    dimen_deposito,
    nivel_agua,
    distancia_obra_paneles,
    req_respaldo_elec,
    req_monitoreo_remoto,
    exis_cobertura,
    tipo_bomba,
    created_at,
    altura_estatica,
    descenso_nivel,
    long_tuberia,
    diametro_tub,
    cant_accesorios,
    volumen_deposito,
    long_cable_motor,
    altura_succion,
    altura_impulsion,
  } = values;

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (idCustomer > 0) {
      BombeoServices.update(idCustomer, values)
        .then((response) => {
          setIdCustomer(0);

          setOptionsAlert({
            show: true,
            severity: 'success',
            msj: 'Modificado con éxito!',
          });
          reset();
          setNewCustomer(true);
          setTimeout(() => {
            setOptionsAlert({
              show: false,
              severity: 'success',
              msj: 'Modificado con éxito!',
            });
            setOpen(false);
            setIsLoading(false);
          }, 2000);
        })
        .catch((e) => {
          setIsLoading(false);
          setOptionsAlert({
            show: true,
            severity: 'error',
            msj: 'Ocurrio un un error, vuelva a intentar!',
          });
          console.log(e);
        });
    } else {
      BombeoServices.create(values)
        .then((response) => {
          setOptionsAlert({
            show: true,
            severity: 'success',
            msj: 'Guardado con éxito!',
          });
          reset();
          setNewCustomer(true);
          setTimeout(() => {
            setOptionsAlert({
              show: false,
              severity: 'success',
              msj: 'Guardado con éxito!',
            });
            setOpen(false);
            setIsLoading(false);
          }, 2000);
        })
        .catch((e) => {
          setIsLoading(false);
          setOptionsAlert({
            show: true,
            severity: 'error',
            msj: 'Ocurrio un un error, vuelva a intentar!',
          });
          console.log(e);
        });
    }
  };

  const handleClickOpen = (scrollType) => () => {
    setFormEmpity({
      nombre: '',
      empresa: '',
      municipio: '',
      telefono: '',
    });
    setOpen(true);
    setScroll(scrollType);
    setTitleDialog('Nuevo');
  };

  const handleClose = () => {
    setIsLoading(false);
    setOpen(false);
    setOptionsAlert({
      show: false,
      severity: 'error',
      msj: 'Ocurrio un un error, vuelva a intentar!',
    });
  };

  const classes = useStyles();

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='cabecera'
              variant='scrollable'
              scrollButtons='auto'
            >
              <Tab label='Contacto' {...a11yProps(0)} />
              <Tab label='Ubicación' {...a11yProps(1)} />
              <Tab label='Aplicación' {...a11yProps(2)} />
              <Tab label='Obra de Toma' {...a11yProps(3)} />
              <Tab label='Inst. Solar' {...a11yProps(4)} />
              <Tab label='Inst. Bomba' {...a11yProps(5)} />
            </Tabs>
          </Toolbar>
        </AppBar>
        {isLoading && <LinearProgress />}
        <AlertComponent optionsAlert={optionsAlert} />

        <DialogTitle id='scroll-dialog-title'>
          {titleDialog} Contacto
        </DialogTitle>

        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id='scroll-dialog-description'
            ref={descriptionElementRef}
            tabIndex={-1}
          ></DialogContentText>

          <TabPanel value={value} index={0}>
            <Grid item xs={12} className={classes.rootGrid}>
              <Paper elevation={0} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete='off'>
                  <TextField
                    name='nombre'
                    label='Nombre'
                    variant='outlined'
                    value={nombre}
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='empresa'
                    value={empresa}
                    label='Empresa'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='telefono'
                    value={telefono}
                    label='Teléfono'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='email'
                    value={email}
                    label='Email'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </form>
              </Paper>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid item xs={12} className={classes.rootGrid}>
              <Paper elevation={0} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete='off'>
                  <TextField
                    name='comunidad'
                    label='Comunidad'
                    variant='outlined'
                    value={comunidad}
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='municipio'
                    value={municipio}
                    label='Ciudad'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='altitud'
                    value={altitud}
                    label='Altitud'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='lat'
                    value={lat}
                    label='Latitud'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <TextField
                    name='long'
                    value={long}
                    label='Longitud'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </form>
              </Paper>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid item xs={12} className={classes.rootGrid}>
              <Paper elevation={0} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete='off'>
                  <TextField
                    name='aplicacion'
                    label='Aplicacion'
                    variant='outlined'
                    value={aplicacion}
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='req_diario_agua'
                    value={req_diario_agua}
                    label='Req. diario de agua'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='req_esp_temporada'
                    value={req_esp_temporada}
                    label='Requerimiento específico en temporada:'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {uso_agua_potable && (
                    <TextField
                      name='uso_agua_potable'
                      value={uso_agua_potable}
                      label='Uso del agua potable'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                  {tipo_sembradio && (
                    <TextField
                      name='tipo_sembradio'
                      value={tipo_sembradio}
                      label='Tipo de sembradío'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                  {tanque_almacenamiento && (
                    <TextField
                      name='tanque_almacenamiento'
                      value={tanque_almacenamiento}
                      label='Tanque de almacenamiento'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}

                  {equipo_riego && (
                    <TextField
                      name='equipo_riego'
                      value={equipo_riego}
                      label={'Equipos de riego'}
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                </form>
              </Paper>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Grid item xs={12} className={classes.rootGrid}>
              <Paper elevation={0} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete='off'>
                  <TextField
                    name='fuente_agua_bomb'
                    label='Fuente de agua de donde será bombeada'
                    variant='outlined'
                    value={fuente_agua_bomb}
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='var_nivel_agua'
                    value={var_nivel_agua}
                    label='Variaciones del nivel de agua por estaciones'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='temp_agua'
                    value={temp_agua}
                    label='Temperatura del agua'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='calidad_agua'
                    value={calidad_agua}
                    label='Calidad del agua'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <TextField
                    name='vel_recuperacion'
                    value={vel_recuperacion}
                    label='Velocidad recuperación'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  {diametro_pozo && (
                    <TextField
                      name='diametro_pozo'
                      value={diametro_pozo}
                      label='Diametro de pozo'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}

                  {profundidad_pozo && (
                    <TextField
                      name='profundidad_pozo'
                      value={profundidad_pozo}
                      label='Diametro de pozo'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}

                  {profundidad_agua && (
                    <TextField
                      name='profundidad_agua'
                      value={profundidad_agua}
                      label='Diametro de pozo'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}

                  <TextField
                    name='ubi_filtros'
                    value={ubi_filtros}
                    label='Velocidad recuperación'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {dispone_camaras && (
                    <TextField
                      name='dispone_camaras'
                      value={dispone_camaras}
                      label={'Dispone de camaras'}
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                  {dimen_deposito && (
                    <TextField
                      name='dimen_deposito'
                      value={dimen_deposito}
                      label={'Dimensiones depósito'}
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}

                  {nivel_agua && (
                    <TextField
                      name='nivel_agua'
                      value={nivel_agua}
                      label={'Nivel de agua'}
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                </form>
              </Paper>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={4}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={5}>
            Item Three
          </TabPanel>

          {/* <TableBombeo idCustomer={idCustomer} /> */}
        </DialogContent>
        <DialogActions>
          {isLoading ? (
            <>
              <Button color='primary' disabled>
                Volver
              </Button>
              {/* <Button color='primary' disabled>
                Guardar
              </Button> */}
            </>
          ) : (
            <>
              <Button onClick={handleClose} color='primary'>
                Volver
              </Button>
              {/* <Button onClick={handleSubmit} color='primary'>
                Guardar
              </Button> */}
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

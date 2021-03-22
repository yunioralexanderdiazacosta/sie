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

  var {
    //DATOS DEL CLIENTE
    nombre,
    empresa,
    telefono,
    email,
    //UBICACION
    ciudad,
    municipio,
    altitud,
    lat,
    long,
    observacion_ubicacion, 
    
    //TIPO
    tipo_piscina,

	//DATOS TECNICOS 
	datos_tecnicos_ancho,
	datos_tecnicos_profundidad,
   
	//CARACTERISTICAS LUGAR DE INSTALACION
    cubierta_inclinada,
    ancho_cubierta,
    altura_alero,
    altura_cumbrera,
    inclinacion,
    acimut,
    comentario_cubierta,

	tipo_cubierta,
	estado_tipo_cubierta,
	antiguedad_tipo_cubierta,
	altura_cresta_tipo_cubierta,
	ancho_tipo_cubierta,
	largo_tipo_cubierta,
	comentario_tipo_cubierta,


    material_estructura_cubierta,
    dimensiones_estructura_cubierta,
    estado_estructura_cubierta,
    antiguedad_estructura_cubierta,
    distancia_correas,
    distancia_vigas,
    reforzamiento_estructura,

    tejado_plano,
    terminacion_cubierta,
    long_tejado,
    ancho_tejado,
    altura_alero_tejado,
    espesor_vaciado,
    altura_parapeto,
    acimut_tejado,
    comentario_tejado,

    //DATOS DE LA BOMBA
    datos_bomba,
    origen_agua,
    potencia_bomba,

    //VERIFICACIÒN TUBERIA EXISTENTE
    verif_tuberia_existente,
    accesorios_necesarios_codo,
    accesorios_necesarios_cupla,

    //OTROS DATOS IMPORTANTES
    disp_agua_anual,
    energia_electrica,
    calidad_agua,
    apoyo_gas,
    req_apoyo_gas,
    long_cable_sensores,
    conexion_tuberias_techo,
    trabajos_plomeria_adicional,
    apertura_zanjas,
    reposicion_cemento_ceramica,
    comentario_recorrido_tuberias,

  } = values;

  const handleSubmit = (e) => {
   
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
              <Tab label='Cliente' {...a11yProps(0)} />
              <Tab label='Ubicación' {...a11yProps(1)} />
              <Tab label='Tipo y uso' {...a11yProps(2)} />
              <Tab label='Datos Tecnicos' {...a11yProps(3)} />
              <Tab label='Caract. Del lugar de instalación' {...a11yProps(4)} />
              <Tab label='Datos de la bomba' {...a11yProps(5)} />
              <Tab label='Verificación de tubería existente' {...a11yProps(6)} />
              <Tab label='Otros datos importantes' {...a11yProps(7)} />
            </Tabs>
          </Toolbar>
        </AppBar>
        {isLoading && <LinearProgress />}
        <AlertComponent optionsAlert={optionsAlert} />

        <DialogTitle id='scroll-dialog-title'>
          {titleDialog} Cliente
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
                    name='ciudad'
                    label='Ciudad'
                    variant='outlined'
                    value={ciudad}
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='municipio'
                    value={municipio}
                    label='Municipio'
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

                  <TextField
                    fullWidth
                    name='observacion_ubicacion'
                    value={observacion_ubicacion}
                    label='Observaciones'
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
                      name='tipo_piscina'
                      value={tipo_piscina}
                      label='Tipo'
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

		  <TabPanel value={value} index={3}>
            <Grid item xs={12} className={classes.rootGrid}>
              <Paper elevation={0} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete='off'>
                 
                    <TextField
                      name='datos_tecnicos_ancho'
                      value={datos_tecnicos_ancho}
                      label='Ancho'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

					<TextField
                      name='datos_tecnicos_profundidad'
                      value={datos_tecnicos_profundidad}
                      label='Profundidad'
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
		  
		  <TabPanel value={value} index={4}>
            <Grid item xs={12} className={classes.rootGrid}>
              <Paper elevation={0} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete='off'>
                    <TextField
                      name='cubierta_inclinada'
                      value={cubierta_inclinada}
                      label='Cubierta inclinada'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='ancho_cubierta'
                      value={ancho_cubierta}
                      label='Ancho'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='altura_alero'
                      value={altura_alero}
                      label='Altura alero'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='altura_cumbrera'
                      value={altura_cumbrera}
                      label='Altura de la cumbrera'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='inclinacion'
                      value={inclinacion}
                      label='Inclinación'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='acimut'
                      value={acimut}
                      label='Acimut'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='comentario_cubierta'
                      value={comentario_cubierta}
                      label='Comentario'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    /> 
                    <br/><br/><br/>

                    <TextField
                      name='tipo_cubierta'
                      value={tipo_cubierta}
                      label='Tipo'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

					<TextField
                      name='antiguedad_tipo_cubierta'
                      value={antiguedad_tipo_cubierta}
                      label='Antigüedad aprox. (años)'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

					<TextField
                      name='estado_tipo_cubierta'
                      value={estado_tipo_cubierta}
                      label='Estado'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

					<TextField
                      name='altura_cresta_tipo_cubierta'
                      value={altura_cresta_tipo_cubierta}
                      label='Altura'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

                    <TextField
                      name='ancho_tipo_cubierta'
                      value={ancho_tipo_cubierta}
                      label='Ancho'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

                    <TextField
                      name='largo_tipo_cubierta'
                      value={largo_tipo_cubierta}
                      label='Largo'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

                    <TextField
                      name='comentario_tipo_cubierta'
                      value={comentario_tipo_cubierta}
                      label='Comentarios'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

                    <br/><br/><br/>
                    <TextField
                      name='material_estructura_cubierta'
                      value={material_estructura_cubierta}
                      label='Material estructura cubierta'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='dimensiones_estructura_cubierta'
                      value={dimensiones_estructura_cubierta}
                      label='Dimensiones'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='estado_estructura_cubierta'
                      value={estado_estructura_cubierta}
                      label='Estado'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='antiguedad_estructura_cubierta'
                      value={antiguedad_estructura_cubierta}
                      label='Antigüedad aprox. (años)'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='distancia_correas'
                      value={distancia_correas}
                      label='Distancia entre correas'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='distancia_vigas'
                      value={distancia_vigas}
                      label='Distancia entre vigas'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='reforzamiento_estructura'
                      value={reforzamiento_estructura}
                      label='Necesidad de reforzamiento de la estructura'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    {/* TEJADO PLANO */}
                    <br/><br/><br/>
                    <TextField
                      name='tejado_plano'
                      value={tejado_plano}
                      label='Tejado plano (Loza)'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='terminacion_cubierta'
                      value={terminacion_cubierta}
                      label='Terminación de cubierta '
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='long_tejado'
                      value={long_tejado}
                      label='Longitud'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='ancho_tejado'
                      value={ancho_tejado}
                      label='Ancho'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='altura_alero_tejado'
                      value={altura_alero_tejado}
                      label='Altura del alero'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='espesor_vaciado'
                      value={espesor_vaciado}
                      label='Espesor de vaciado'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='altura_parapeto'
                      value={altura_parapeto}
                      label='Altura del parapeto'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='acimut_tejado'
                      value={acimut_tejado}
                      label='Acimut'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='comentario_tejado'
                      value={comentario_tejado}
                      label='Comentario'
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

          <TabPanel value={value} index={5}>
            <Grid item xs={12} className={classes.rootGrid}>
              <Paper elevation={0} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete='off'>
                    <TextField
                      name='datos_bomba'
                      value={datos_bomba}
                      label='Datos bomba'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='origen_agua'
                      value={origen_agua}
                      label='Origen del agua'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='potencia_bomba'
                      value={potencia_bomba}
                      label='Potencia de la bomba'
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

          <TabPanel value={value} index={6}>
            <Grid item xs={12} className={classes.rootGrid}>
              <Paper elevation={0} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete='off'>
                    <TextField
                      name='verif_tuberia_existente'
                      value={verif_tuberia_existente}
                      label='Datos bomba'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <br/><br/><br/>
                    <TextField
                      name='accesorios_necesarios_codo'
                      value={accesorios_necesarios_codo}
                      label='Codo'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='accesorios_necesarios_cupla'
                      value={accesorios_necesarios_cupla}
                      label='Cupla'
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

            <TabPanel value={value} index={7}>
                <Grid item xs={12} className={classes.rootGrid}>
                    <Paper elevation={0} className={classes.paper}>
                        <form className={classes.root} noValidate autoComplete='off'>
                            <TextField
                              name='disp_agua_anual'
                              value={disp_agua_anual}
                              label='Disponibilidad de agua anual'
                              variant='outlined'
                              onChange={handleInputChange}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <TextField
                              name='energia_electrica'
                              value={energia_electrica}
                              label='Cuenta con energía eléctrica'
                              variant='outlined'
                              onChange={handleInputChange}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <TextField
                              name='calidad_agua'
                              value={calidad_agua}
                              label='Calidad de agua'
                              variant='outlined'
                              onChange={handleInputChange}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <TextField
                              name='apoyo_gas'
                              value={apoyo_gas}
                              label='Tiene apoyo a Gas'
                              variant='outlined'
                              onChange={handleInputChange}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <TextField
                              name='req_apoyo_gas'
                              value={req_apoyo_gas}
                              label='Requiere Apoyo Gas '
                              variant='outlined'
                              onChange={handleInputChange}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <TextField
                              name='long_cable_sensores'
                              value={long_cable_sensores}
                              label='Longitud de Cable para los sensores'
                              variant='outlined'
                              onChange={handleInputChange}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <TextField
                              name='conexion_tuberias_techo'
                              value={conexion_tuberias_techo}
                              label='Tiene conexión de tuberías al techo'
                              variant='outlined'
                              onChange={handleInputChange}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <TextField
                              name='trabajos_plomeria_adicional'
                              value={trabajos_plomeria_adicional}
                              label='Trabajos de plomería adicional'
                              variant='outlined'
                              onChange={handleInputChange}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <TextField
                              name='apertura_zanjas'
                              value={apertura_zanjas}
                              label='Apertura de zanjas'
                              variant='outlined'
                              onChange={handleInputChange}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <TextField
                              name='reposicion_cemento_ceramica'
                              value={reposicion_cemento_ceramica}
                              label='Reposición de cemento/cerámica '
                              variant='outlined'
                              onChange={handleInputChange}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <TextField
                              name='reposicion_cemento_ceramica'
                              value={comentario_recorrido_tuberias}
                              label='Comentario'
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

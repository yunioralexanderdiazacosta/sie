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
import LinearProgress from '@material-ui/core/LinearProgress';
import AlertComponent from '../ui/AlertComponent';

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
    //CONSUMO AGUA CALIENTE
    consumo_agua_caliente,
    punto_consumo,

    //CARACTERÍSTICAS DEL LUGAR DE INSTALACIÓN
    cubierta_inclinada,
    long_cubierta,
    ancho_cubierta,
    altura_alero,
    altura_cumbrera,
    inclinacion,
    acimut,
    comentario_cubierta,

    tipo_cubierta,
    estado_tipo_cubierta,
    antiguedad_tipo_cubierta,
    altura_cresta,
    ancho_tipo_cubierta,
    largo_tipo_cubierta,
    comentario_tipo_cubierta,

    material_estructura_cubierta,
    dimensiones_estructura_cubierta,
    estado_estructura_cubierta,
    //antiguedad_estructura_cubierta,
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

    altura_tanque_agua,
    presion_bomba,
    presion_red,
    cuenta_con_filtro,

    //OTRAS CARACTERÍSTICAS DEL SITIO DE INSTALACION
    disponibilidad_agua_anual,
    energia_electrica,
    calidad_agua,
    apoyo_electrico,
    long_cable_sensores,
    energia_electrica_controlador,
    red_agua_caliente,

    material_exist_frio_tuberia,
    material_exist_frio_codo,

    material_exist_caliente_pvc,
    material_exist_caliente_ips,

    accesorios_necesarios_codos,
    accesorios_necesarios_cupla,
    
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
              <Tab label='Consumo de agua caliente' {...a11yProps(2)} />
              <Tab label='Caract. Del lugar de instalación' {...a11yProps(3)} />
              <Tab label='Otras Caract. Del sitio de instalaciòn' {...a11yProps(4)} />
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
                            name='consumo_agua_caliente'
                            label='Consumo de agua caliente'
                            variant='outlined'
                            value={consumo_agua_caliente}
                            onChange={handleInputChange}
                            InputProps={{
                              readOnly: true,
                            }}
                        />
                        <TextField
                            name='punto_consumo'
                            value={punto_consumo}
                            label='Puntos de consumo'
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
                          name='altura_cresta'
                          value={altura_cresta}
                          label='Altura de la cresta'
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
                        {/*<TextField
                          name='antiguedad_estructura_cubierta'
                          value={antiguedad_estructura_cubierta}
                          label='Antigüedad aprox. (años)'
                          variant='outlined'
                          onChange={handleInputChange}
                          InputProps={{
                            readOnly: true,
                          }}
                        />*/}
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
                        <br/><br/><br/>
                        
                        <TextField
                          name='altura_tanque_agua'
                          value={altura_tanque_agua}
                          label='Altura del tanque de agua respecto al nivel de cubierta termosolar'
                          variant='outlined'
                          onChange={handleInputChange}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          name='presion_bomba'
                          value={presion_bomba}
                          label='Presión de trabajo de la bomba'
                          variant='outlined'
                          onChange={handleInputChange}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          name='presion_red'
                          value={presion_red}
                          label='Presión de trabajo de la red'
                          variant='outlined'
                          onChange={handleInputChange}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          name='cuenta_con_filtro'
                          value={cuenta_con_filtro}
                          label='En caso de pozo propio ¿cuenta con filtro?'
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
                                name='disponibilidad_agua_anual'
                                label='Disponibilidad de agua anual'
                                variant='outlined'
                                value={disponibilidad_agua_anual}
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                name='energia_electrica'
                                label='Cuenta con energía eléctrica'
                                variant='outlined'
                                value={energia_electrica}
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                name='calidad_agua'
                                label='Calidad de agua'
                                variant='outlined'
                                value={calidad_agua}
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                name='apoyo_electrico'
                                label='¿Requiere apoyo eléctrico?'
                                variant='outlined'
                                value={apoyo_electrico}
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                name='long_cable_sensores'
                                label='Longitud de cable para los sensores'
                                variant='outlined'
                                value={long_cable_sensores}
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                name='energia_electrica_controlador'
                                label='Disponibilidad de energía eléctrica para el controlador'
                                variant='outlined'
                                value={energia_electrica_controlador}
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                name='red_agua_caliente'
                                label='¿Existe red de agua caliente?'
                                variant='outlined'
                                value={red_agua_caliente}
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <br/><br/><br/>

                            <TextField
                                name='material_exist_frio_tuberia'
                                label='tuberia'
                                variant='outlined'
                                value={material_exist_frio_tuberia}
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                name='material_exist_frio_codo'
                                label='codo'
                                variant='outlined'
                                value={material_exist_frio_codo}
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <br/><br/><br/>

                            <TextField
                                name='material_exist_caliente_pvc'
                                label='pvc'
                                variant='outlined'
                                value={material_exist_caliente_pvc}
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                name='material_exist_caliente_ips'
                                label='ips'
                                variant='outlined'
                                value={material_exist_caliente_ips}
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <br/><br/><br/>

                            <TextField
                                name='accesorios_necesarios_codos'
                                label='codos'
                                variant='outlined'
                                value={accesorios_necesarios_codos}
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                name='accesorios_necesarios_cupla'
                                label='cupla'
                                variant='outlined'
                                value={accesorios_necesarios_cupla}
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
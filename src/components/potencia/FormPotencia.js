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
    //TIPO DE CONSUMO
    tipo_consumo,
    num_medidor,
    num_cliente,
    observacion_cliente, 

    //CARACTERISTICAS DEL LUGAR DE INSTALACIÒN 
    cubierta_inclinada,
    ancho,
    altura_alero,
    altura_cumbrera,
    inclinacion,
    acimut,
    comentario_lugar_instalacion,

    tipo_cubierta,
    antiguedad_tipo_cubierta,
    estado_tipo_cubierta,
    altura_cresta_tipo_cubierta,
    ancho_tipo_cubierta,
    largo_tipo_cubierta,
    comentario_tipo_cubierta,

    dimensiones_material_cubierta,
    estado_material_cubierta,
    antiguedad_material_cubieta,
    distancia_correas_material,
    distancia_vigas_material,
    comentario_material_estructura,

    terminacion_cubierta,
    ancho_tejado,
    altura_alero_tejado,
    espesor_vaciado_tejado,
    altura_parapeto_tejado,
    acimut_tejado,
    comentario_tejado_plano,

    presencia_sombras,
    linea_vida,
    planos_digitales,
    tipo_documento,
    sugerencia_modulos_fotovoltaicos,

    tipo_medidor,
    tipo_alimentacion_tipo,
    puesta_tierra,
    voltaje,
    control_externo,
    ambiente_protecciones_medidor,
    punto_inyeccion,
    identifican_fases,
    identifican_colores,
    capacidad_breaker,
    identifican_pararayos,
    identifican_sistema_respaldo,
    planos_electricos,
    especifique,

    long_cableado,
    material_cableado,

    wifi,
    wifi_cobertura,
    cobertura_wifi_modulos_fotovoltaicos,
    rack_ethernet,
    rack_proximo_inversor,
    distancia,
  
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
              <Tab label='Tipo de consumo' {...a11yProps(2)} />
              <Tab label='Caract. Del lugar de instalación' {...a11yProps(3)} />
              <Tab label='Características eléctricas y comunicación' {...a11yProps(4)} />
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
                    name='tipo_consumo'
                    label='Tipo consumo'
                    variant='outlined'
                    value={tipo_consumo}
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='num_medidor'
                    label='Número de medidor(es)'
                    variant='outlined'
                    value={num_medidor}
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='num_cliente'
                    label='Número de cliente'
                    variant='outlined'
                    value={num_cliente}
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />   
                  <TextField
                    fullWidth
                    name='observacion_cliente'
                    value={observacion_cliente}
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
                      name='ancho'
                      value={ancho}
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
                      name='comentario_lugar_instalacion'
                      value={comentario_lugar_instalacion}
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
                      name='dimensiones_material_cubierta'
                      value={dimensiones_material_cubierta}
                      label='Dimensiones'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='estado_material_cubierta'
                      value={estado_material_cubierta}
                      label='Estado'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='antiguedad_material_cubieta'
                      value={antiguedad_material_cubieta}
                      label='Antigüedad aprox. (años)'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='distancia_correas_material'
                      value={distancia_correas_material}
                      label='Distancia entre correas'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='distancia_vigas_material'
                      value={distancia_vigas_material}
                      label='Distancia entre vigas'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='comentario_material_estructura'
                      value={comentario_material_estructura}
                      label='comentario'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <br/><br/><br/>

                    <TextField
                      name='terminacion_cubierta'
                      value={terminacion_cubierta}
                      label='Terminación de cubierta'
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
                      label='Altura alero'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='espesor_vaciado_tejado'
                      value={espesor_vaciado_tejado}
                      label='Espesor de vaciado'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='altura_parapeto_tejado'
                      value={altura_parapeto_tejado}
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
                      name='comentario_tejado_plano'
                      value={comentario_tejado_plano}
                      label='Comentario'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <br/><br/><br/>
                    
                    <TextField
                      name='presencia_sombras'
                      value={presencia_sombras}
                      label='Presencia de sombras en el lugar'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='linea_vida'
                      value={linea_vida}
                      label='¿Cuenta con línea de vida?'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='planos_digitales'
                      value={planos_digitales}
                      label='¿Cuenta con línea de vida?'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='tipo_documento'
                      value={tipo_documento}
                      label='Tipo de documento'
                      variant='outlined'
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      name='sugerencia_modulos_fotovoltaicos'
                      value={sugerencia_modulos_fotovoltaicos}
                      label='sugerencia del emplazamiento de módulos fotovoltaicos'
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
                    fullWidth
                    name='tipo_medidor'
                    value={tipo_medidor}
                    label='Tipo de medidor'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <br/><br/><br/>

                  <TextField
                    name='tipo_alimentacion_tipo'
                    value={tipo_alimentacion_tipo}
                    label='Tipo de alimentación'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='puesta_tierra'
                    value={puesta_tierra}
                    label='Sistema de puesta a tierra'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='voltaje'
                    value={voltaje}
                    label='Voltaje N-PE'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                   <TextField
                    name='control_externo'
                    value={control_externo}
                    label='Requiere tablero de control externo'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='ambiente_protecciones_medidor'
                    value={ambiente_protecciones_medidor}
                    label='Dispone ambientes de montaje para protecciones y el un medidor de energía'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='punto_inyeccion'
                    value={punto_inyeccion}
                    label='¿El punto de inyección es accesible?'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='identifican_fases'
                    value={identifican_fases}
                    label='¿Se identifican las fases?'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='identifican_colores'
                    value={identifican_colores}
                    label='¿Se identifica colores bajo norma?'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='capacidad_breaker'
                    value={capacidad_breaker}
                    label='Capacidad - Breaker principal (A)'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='identifican_pararayos'
                    value={identifican_pararayos}
                    label='¿Se identifican pararrayos?'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='identifican_sistema_respaldo'
                    value={identifican_sistema_respaldo}
                    label='¿Se identifica un sistema de respaldo?'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='planos_electricos'
                    value={planos_electricos}
                    label='¿Se cuenta con planos eléctricos?'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='especifique'
                    value={especifique}
                    label='Especifique'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <br/><br/><br/>

                  <TextField
                    name='long_cableado'
                    value={long_cableado}
                    label='Longitud cableado'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='material_cableado'
                    value={material_cableado}
                    label='Material(es) cableado'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <br/><br/><br/>

                  <TextField
                    name='wifi'
                    value={wifi}
                    label='¿Cuenta con Wi – Fi?'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  /> 
                  <TextField
                    name='wifi_cobertura'
                    value={wifi_cobertura}
                    label='¿La señal Wi – Fi tiene cobertura hasta la posición del inversor?'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='cobertura_wifi_modulos_fotovoltaicos'
                    value={cobertura_wifi_modulos_fotovoltaicos}
                    label='¿La señal Wi – Fi tiene cobertura hasta la posición de los módulos fotovoltaicos?'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='rack_ethernet'
                    value={rack_ethernet}
                    label='¿Cuenta con un Rack Ethernet?'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='rack_proximo_inversor'
                    value={rack_proximo_inversor}
                    label='¿El Rack es próximo al inversor?'
                    variant='outlined'
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name='distancia'
                    value={distancia}
                    label='Distancia (m)'
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

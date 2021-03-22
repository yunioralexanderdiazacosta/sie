import React, {useState, useEffect} from 'react';
import Title from '../Title';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import {col} from './Data.js';
import TermosolarServices from '../../services/TermosolarServices';
import FormTermosolar from './FormTermosolar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />; 
}

const Termosolares = () => {
  const [termosolar, setTermosolar] = useState([]);
  const [newCustomer, setNewCustomer] = useState(false);
  const [open, setOpen] = useState(false);
  const [idCustomer, setIdTermosolar] = useState(0);
  const [formEmpity, setFormEmpity] = useState({});
  const [titleDialog, setTitleDialog] = useState('Detalle');
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    retrieveTermosolares();
  }, [newCustomer]);

  const retrieveTermosolares = () => {
    TermosolarServices.getAll()
      .then((response) => {
        setTermosolar(response.data);
        setNewCustomer(false);
        console.log(response)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleClickOpen = () => {
    setOpenDialogDelete(true);
  };

  const handleClose = () => {
    setOpenDialogDelete(false);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const deleteProduct = () => {
   
  };

  const columns = [
    ...col,
    {
      name: 'OPCIONES',
      selector: '',
      cell: (d) => (
        <span>
          <IconButton
            color='primary'
            aria-label='add to shopping cart'
            onClick={() => {
              setFormEmpity({
				//DATOS DEL CLIENTE
                nombre: d.Nombre,
                empresa: d.Empresa,
                telefono: d.Telefono,
                email: d.Email,

                //UBICACION
				ciudad: d.Ciudad,
                municipio: d.Municipio,
                altitud: d.Alt,
                lat: d.Lat,
                long: d.Long,
                observacion_ubicacion: d.Observacion_ubicacion, 

                //CONSUMO AGUA CALIENTE
                consumo_agua_caliente: d.Consumo_agua_caliente,
                punto_consumo: d.Punto_consumo,

                //CARACTERÍSTICAS DEL LUGAR DE INSTALACIÓN
                cubierta_inclinada: d.Cubierta_inclinada,
                long_cubierta: d.Long_cubierta,
                ancho_cubierta: d.Ancho_cubierta,
                altura_alero: d.Altura_alero,
                altura_cumbrera: d.Altura_cumbrera,
                inclinacion: d.Inclinacion,
                acimut: d.Acimut,
                comentario_cubierta: d.Comentario_cubierta,

                tipo_cubierta: d.Tipo_cubierta,
                estado_tipo_cubierta: d.Estado_tipo_cubierta,
                antiguedad_tipo_cubierta: d.Antiguedad_tipo_cubierta,
                altura_cresta: d.Altura_cresta,
                ancho_tipo_cubierta: d.Ancho_tipo_cubierta,
                largo_tipo_cubierta: d.Largo_tipo_cubierta,
                comentario_tipo_cubierta: d.Comentario_tipo_cubierta,

                material_estructura_cubierta: d.Material_estructura_cubierta,
                dimensiones_estructura_cubierta: d.Dimensiones_estructura_cubierta,
                estado_estructura_cubierta: d.Estado_estructura_cubierta,
                //antiguedad_estructura_cubierta: d.Antiguedad_estructura_cubierta,
                distancia_correas: d.Distancia_correas,
                distancia_vigas: d.Distancia_vigas,
                reforzamiento_estructura: d.Reforzamiento_estructura,

                tejado_plano: d.Tejado_plano,
                terminacion_cubierta: d.Terminacion_cubierta,
                long_tejado: d.Long_tejado,
                ancho_tejado: d.Ancho_tejado, 
                altura_alero_tejado: d.Altura_alero_tejado,
                espesor_vaciado: d.Espesor_vaciado,
                altura_parapeto: d.Altura_parapeto,
                acimut_tejado: d.Acimut_tejado,
                comentario_tejado: d.Comentario_tejado,


                altura_tanque_agua: d.Altura_tanque_agua,
                presion_bomba: d.Presion_bomba,
                presion_red: d.Presion_red,
                cuenta_con_filtro: d.Cuenta_con_filtro,

                //OTRAS CARACTERÍSTICAS DEL SITIO DE INSTALACION
                disponibilidad_agua_anual: d.Disponibilidad_agua_anual,
                energia_electrica: d.Energia_electrica,
                calidad_agua: d.Calidad_agua,
                apoyo_electrico: d.Apoyo_electrico,
                long_cable_sensores: d.Long_cable_sensores,
                energia_electrica_controlador: d.Energia_electrica_controlador,
                red_agua_caliente: d.Red_agua_caliente,

                material_exist_frio_tuberia: d.Material_exist_frio.tuberia,
                material_exist_frio_codo: d.Material_exist_frio.codo,

                material_exist_caliente_pvc: d.Material_exist_caliente.pvc,
                material_exist_caliente_ips: d.Material_exist_caliente.ips,

                accesorios_necesarios_codos: d.Accesorios_necesarios.codos,
                accesorios_necesarios_cupla: d.Accesorios_necesarios.cupla,
                
                created_at: d.created_at,
              });
              setIdTermosolar(d.id);
              setTitleDialog('Detalle');
              setOpen(true);
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </span>
      ),
    },
  ];
  const tableData = {
    columns,
  };

  return (
    <>
      <div style={{width: '100%'}}>
        <Box display='flex' bgcolor='background.paper'>
          <Box flexGrow={1}>
            <Title>Contactos</Title>
          </Box>
          <FormTermosolar
              setNewCustomer={setNewCustomer}
              open={open}
              setOpen={setOpen}
              formEmpity={formEmpity}
              setFormEmpity={setFormEmpity}
              idCustomer={idCustomer}
              setIdCustomer={setIdTermosolar}
              titleDialog={titleDialog}
              setTitleDialog={setTitleDialog}
            />
        </Box>
      </div>

      <DataTableExtensions
        {...tableData}
        data={termosolar}
        filterPlaceholder='Buscar clientes'
      >
        <DataTable
          defaultSortField='id'
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      </DataTableExtensions>

      <Dialog
        open={openDialogDelete}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Esta seguro que quiere eliminar el elemento seleccionado?'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              deleteProduct();
            }}
            color='primary'
            autoFocus
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity='success'>
          Se elimino correctamente!
        </Alert>
      </Snackbar>
    </>
  );
};
export default Termosolares;
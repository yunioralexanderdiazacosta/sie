import React, {useState, useEffect} from 'react';
import Title from '../Title';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import {col} from './Data.js';
import PiscinaServices from '../../services/PiscinaServices';
import FormPiscina from './FormPiscina';
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

const Piscinas = () => {
  const [piscina, setPiscina] = useState([]);
  const [newCustomer, setNewCustomer] = useState(false);
  const [open, setOpen] = useState(false);
  const [idCustomer, setIdPiscina] = useState(0);
  const [formEmpity, setFormEmpity] = useState({});
  const [titleDialog, setTitleDialog] = useState('Detalle');
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    retrievePiscinas();
  }, [newCustomer]);

  const retrievePiscinas = () => {
    PiscinaServices.getAll()
      .then((response) => {
        setPiscina(response.data);
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
				//TIPO
				tipo_piscina: d.Tipo_piscina,
				//DATOS Tecnicos
				datos_tecnicos_ancho: d.Datos_tecnicos_piscina.ancho,
				datos_tecnicos_profundidad: d.Datos_tecnicos_piscina.profundidad,
                
                //CARACTERISTICAS LUGAR DE INSTALACION
                cubierta_inclinada: d.Cubierta_inclinada,
				ancho_cubierta: d.Ancho_cubierta,
                altura_alero: d.Altura_alero,
                altura_cumbrera: d.Altura_cumbrera,
                inclinacion: d.Inclinacion,
                acimut: d.Acimut,
                comentario_cubierta: d.Comentario_cubierta,

				tipo_cubierta: d.Tipo_cubierta,
				estado_tipo_cubierta: d.Estado_tipo_cubierta,
				antiguedad_tipo_cubierta: d.Antiguedad_tipo_cubierta,
				altura_cresta_tipo_cubierta: d.Altura_cresta_tipo_cubierta,
				ancho_tipo_cubierta: d.Ancho_tipo_cubierta,
				largo_tipo_cubierta: d.Largo_tipo_cubierta,
				comentario_tipo_cubierta: d.Comentario_tipo_cubierta,

                material_estructura_cubierta: d.Material_estructura_cubierta,
                dimensiones_estructura_cubierta: d.Dimensiones_estructura_cubierta,
                estado_estructura_cubierta: d.Estado_estructura_cubierta,
                antiguedad_estructura_cubierta: d.Antiguedad_estructura_cubierta,
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

                //DATOS DE LA BOMBA
                datos_bomba: d.Datos_bomba,
                origen_agua: d.Origen_agua,
                potencia_bomba: d.Potencia_bomba,

                //VERIFICACIÒN TUBERIA EXISTENTE
                verif_tuberia_existente: d.Verif_tuberia_existente,
                accesorios_necesarios_codo: d.Accesorios_necesarios.codo,
                accesorios_necesarios_cupla: d.Accesorios_necesarios.cupla,

                //OTROS DATOS IMPORTANTES
                disp_agua_anual: d.Disp_agua_anual,
                energia_electrica: d.Energia_electrica,
                calidad_agua: d.Calidad_agua,
                apoyo_gas: d.Apoyo_gas,
                req_apoyo_gas: d.Req_apoyo_gas,
                long_cable_sensores: d.Long_cable_sensores,
                conexion_tuberias_techo: d.Conexion_tuberias_techo,
                trabajos_plomeria_adicional: d.Trabajos_plomeria_adicional,
                apertura_zanjas: d.Apertura_zanjas,
                reposicion_cemento_ceramica: d.Reposicion_cemento_ceramica,
                comentario_recorrido_tuberias: d.Comentario_recorrido_tuberias,
        
                created_at: d.created_at,
              });
              setIdPiscina(d.id);
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
          <FormPiscina
              setNewCustomer={setNewCustomer}
              open={open}
              setOpen={setOpen}
              formEmpity={formEmpity}
              setFormEmpity={setFormEmpity}
              idCustomer={idCustomer}
              setIdCustomer={setIdPiscina}
              titleDialog={titleDialog}
              setTitleDialog={setTitleDialog}
            />
        </Box>
      </div>

      <DataTableExtensions
        {...tableData}
        data={piscina}
        filterPlaceholder='Buscar contacto'
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
export default Piscinas;
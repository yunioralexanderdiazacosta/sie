import React, {useState, useEffect} from 'react';
import Title from '../Title';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import {col} from './Data.js';
import PotenciaServices from '../../services/PotenciaServices';
import FormPotencia from './FormPotencia';
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

const Potencias = () => {
  const [potencia, setPotencia] = useState([]);
  const [newCustomer, setNewCustomer] = useState(false);
  const [open, setOpen] = useState(false);
  const [idCustomer, setIdPotencia] = useState(0);
  const [formEmpity, setFormEmpity] = useState({});
  const [titleDialog, setTitleDialog] = useState('Detalle');
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    retrievePotencias();
  }, [newCustomer]);

  const retrievePotencias = () => {
    PotenciaServices.getAll()
      .then((response) => {
        setPotencia(response.data);
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
                //TIPO DE CONSUMO
                tipo_consumo: d.Tipo_consumo,
                num_medidor: d.Num_medidor,
                num_cliente: d.Num_cliente,
                observacion_cliente: d.Observacion_cliente, 

                //CARACTERISTICAS DEL LUGAR DE INSTALACIÒN 
                cubierta_inclinada: d.Cubierta_inclinada,
                ancho: d.Ancho,
                altura_alero: d.Altura_alero,
                altura_cumbrera: d.Altura_cumbrera,
                inclinacion: d.Inclinacion,
                acimut: d.Acimut,
                comentario_lugar_instalacion: d.Comentario_lugar_instalacion,
				
                tipo_cubierta: d.Tipo_cubierta,
                antiguedad_tipo_cubierta: d.Antiguedad_tipo_cubierta,
                estado_tipo_cubierta: d.Valoriza_estado_tipo_cubierta,
                altura_cresta_tipo_cubierta: d.Altura_cresta_tipo_cubierta,
                ancho_tipo_cubierta: d.Ancho_tipo_cubierta,
                largo_tipo_cubierta: d.Largo_tipo_cubierta,
                comentario_tipo_cubierta: d.Comentario_tipo_cubierta,

                dimensiones_material_cubierta: d.Dimensiones_material_cubierta,
                estado_material_cubierta: d.Estado_material_cubierta,
                antiguedad_material_cubieta: d.Antiguedad_material_cubieta,
                distancia_correas_material: d.Distancia_correas_material,
                distancia_vigas_material: d.Distancia_vigas_material,
                comentario_material_estructura: d.Comentario_material_estructura,

                terminacion_cubierta: d.Terminacion_cubierta,
                ancho_tejado: d.Ancho_tejado,
                altura_alero_tejado: d.Altura_alero_tejado,
                espesor_vaciado_tejado: d.Espesor_vaciado_tejado,
                altura_parapeto_tejado: d.Altura_parapeto_tejado,
                acimut_tejado: d.Acimut_tejado,
                comentario_tejado_plano: d.Comentario_tejado_plano,

                presencia_sombras: d.Presencia_sombras,
                linea_vida: d.Linea_vida,
                planos_digitales: d.Planos_digitales,
                tipo_documento: d.Tipo_documento,
                sugerencia_modulos_fotovoltaicos: d.Sugerencia_modulos_fotovoltaicos,

                tipo_medidor: d.Tipo_medidor,
                tipo_alimentacion_tipo: d.Tipo_alimentacion_tipo,
                puesta_tierra: d.Puesta_tierra,
                voltaje: d.Voltaje,
                control_externo: d.Control_externo,
                ambiente_protecciones_medidor: d.Ambiente_protecciones_medidor,
                punto_inyeccion: d.Punto_inyeccion,
                identifican_fases: d.Identifican_fases,
                identifican_colores: d.Identifican_colores,
                capacidad_breaker: d.Capacidad_breaker,
                identifican_pararayos: d.Identifican_pararayos,
                identifican_sistema_respaldo: d.Identifican_sistema_respaldo,
                planos_electricos: d.Planos_electricos,
                especifique: d.Especifique,

                long_cableado: d.Long_cableado,
                material_cableado: d.Material_cableado,

                wifi: d.Wifi,
                wifi_cobertura: d.Wifi_cobertura,
                cobertura_wifi_modulos_fotovoltaicos: d.Cobertura_wifi_modulos_fotovoltaicos,
                rack_ethernet: d.Rack_ethernet,
                rack_proximo_inversor: d.Rack_proximo_inversor,
                distancia: d.Distancia,

                created_at: d.created_at,
              });
              setIdPotencia(d.id);
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
          <FormPotencia
              setNewCustomer={setNewCustomer}
              open={open}
              setOpen={setOpen}
              formEmpity={formEmpity}
              setFormEmpity={setFormEmpity}
              idCustomer={idCustomer}
              setIdCustomer={setIdPotencia}
              titleDialog={titleDialog}
              setTitleDialog={setTitleDialog}
            />
        </Box>
      </div>

      <DataTableExtensions
        {...tableData}
        data={potencia}
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
export default Potencias;
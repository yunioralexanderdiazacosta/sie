import React, {useState, useEffect} from 'react';
import Title from '../Title';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import {col} from './Data.js';
import BombeoServices from '../../services/BombeoServices';
import FormBombeo from './FormBombeo';
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

const Customers = () => {
  const [customer, setCustomer] = useState([]);
  const [newCustomer, setNewCustomer] = useState(false);
  const [open, setOpen] = useState(false);
  const [idCustomer, setIdCustomer] = useState(0);
  const [formEmpity, setFormEmpity] = useState({});
  const [titleDialog, setTitleDialog] = useState('Detalle');
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    retrieveProducts();
  }, [newCustomer]);

  const retrieveProducts = () => {
    BombeoServices.getAll()
      .then((response) => {
        setCustomer(response.data);
        setNewCustomer(false);
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
    BombeoServices.update(idCustomer, {published_at: null})
      .then((response) => {
        setIdCustomer(0);
        setOpenDialogDelete(false);
        setOpenAlert(true);
        setNewCustomer(true);
      })
      .catch((e) => {
        console.log(e);
      });
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
                nombre: d.nombre,
                empresa: d.empresa,
                municipio: d.municipio,
                telefono: d.telefono,
                email: d.email,
                comunidad: d.comunidad,
                altitud: d.altitud,
                lat: d.lat,
                long: d.long,

                aplicacion: d.aplicacion,
                req_diario_agua: d.req_diario_agua,
                req_esp_temporada: d.req_esp_temporada,
                uso_agua_potable: d.uso_agua_potable,
                tanque_almacenamiento: d.tanque_almacenamiento,
                tipo_sembradio: d.tipo_sembradio,
                equipo_riego: d.equipo_riego,
                fuente_agua_bomb: d.fuente_agua_bomb,
                var_nivel_agua: d.var_nivel_agua,
                temp_agua: d.temp_agua,
                calidad_agua: d.calidad_agua,
                vel_recuperacion: d.vel_recuperacion,
                diametro_pozo: d.diametro_pozo,
                profundidad_pozo: d.profundidad_pozo,
                profundidad_agua: d.profundidad_agua,
                ubi_filtros: d.ubi_filtros,
                dispone_camaras: d.dispone_camaras,
                dimen_deposito: d.dimen_deposito,
                nivel_agua: d.nivel_agua,
                distancia_obra_paneles: d.distancia_obra_paneles,
                req_respaldo_elec: d.req_respaldo_elec,
                req_monitoreo_remoto: d.req_monitoreo_remoto,
                exis_cobertura: d.exis_cobertura,
                tipo_bomba: d.tipo_bomba,
                created_at: d.created_at,
                altura_estatica: d.altura_estatica,
                descenso_nivel: d.descenso_nivel,
                long_tuberia: d.long_tuberia,
                diametro_tub: d.diametro_tub,
                cant_accesorios: d.cant_accesorios,
                volumen_deposito: d.volumen_deposito,
                long_cable_motor: d.long_cable_motor,
                altura_succion: d.altura_succion,
                altura_impulsion: d.altura_impulsion,
              });
              setIdCustomer(d.id);
              setTitleDialog('Detalle');
              setOpen(true);
            }}
          >
            <VisibilityIcon />
          </IconButton>
          {/*<IconButton
            onClick={() => {
              setIdCustomer(d.id);
              handleClickOpen();
            }}
            color='secondary'
            aria-label='add to shopping cart'
          >
            <DeleteIcon />
          </IconButton> */}
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
          <Box>
            <FormBombeo
              setNewCustomer={setNewCustomer}
              open={open}
              setOpen={setOpen}
              formEmpity={formEmpity}
              setFormEmpity={setFormEmpity}
              idCustomer={idCustomer}
              setIdCustomer={setIdCustomer}
              titleDialog={titleDialog}
              setTitleDialog={setTitleDialog}
            />
          </Box>
        </Box>
      </div>

      <DataTableExtensions
        {...tableData}
        data={customer}
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
export default Customers;

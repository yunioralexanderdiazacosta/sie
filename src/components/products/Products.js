import React, {useState, useEffect} from 'react';
import Title from '../Title';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import {col} from './Data.js';
import ProductServices from '../../services/ProductServices';
import FormProduct from './FormProduct';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState(false);
  const [open, setOpen] = useState(false);
  const [idProducto, setIdProducto] = useState(0);
  const [formEmpity, setFormEmpity] = useState({});
  const [titleDialog, setTitleDialog] = useState('Modificar');
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    retrieveProducts();
  }, [newProduct]);

  const retrieveProducts = () => {
    ProductServices.getAll()
      .then((response) => {
        setProducts(response.data);
        setNewProduct(false);
        // console.log(response.data);
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
    ProductServices.update(idProducto, {published_at: null})
      .then((response) => {
        setIdProducto(0);
        setOpenDialogDelete(false);
        setOpenAlert(true);
        setNewProduct(true);
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
                name: d.name,
                generic_name: d.generic_name,
                location: d.location,
                strenght: d.strenght,
                min_stock: d.min_stock,
                box_size: d.box_size,
                unit: d.unit,
                details: d.details,
                category_id: d.category_id.id,
                provider_id: d.provider_id.id,
              });
              setIdProducto(d.id);
              setTitleDialog('Modificar');
              setOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setIdProducto(d.id);
              handleClickOpen();
            }}
            color='secondary'
            aria-label='add to shopping cart'
          >
            <DeleteIcon />
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
            <Title>Productos</Title>
          </Box>
          <Box>
            <FormProduct
              setNewProduct={setNewProduct}
              open={open}
              setOpen={setOpen}
              formEmpity={formEmpity}
              setFormEmpity={setFormEmpity}
              idProducto={idProducto}
              setIdProducto={setIdProducto}
              titleDialog={titleDialog}
              setTitleDialog={setTitleDialog}
            />
          </Box>
        </Box>
      </div>

      <DataTableExtensions
        {...tableData}
        data={products}
        filterPlaceholder='Buscar producto'
      >
        <DataTable
          // noHeader
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
          {'Esta seguro que quiere eliminar el item seleccionado?'}
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
export default AllProducts;

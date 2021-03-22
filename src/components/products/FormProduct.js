import React, {useState, useRef, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {useForm} from '../../hooks/useForm';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ProductServices from '../../services/ProductServices';
import LinearProgress from '@material-ui/core/LinearProgress';
import AlertComponent from '../ui/AlertComponent';

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
}));

export default function FormProduct({
  setNewProduct,
  open,
  setOpen,
  formEmpity,
  setFormEmpity,
  idProducto,
  setIdProducto,
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
    name,
    generic_name,
    location,
    strenght,
    min_stock,
    box_size,
    unit,
    details,
    category_id,
    provider_id,
  } = values;

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (idProducto > 0) {
      ProductServices.update(idProducto, values)
        .then((response) => {
          setIdProducto(0);

          setOptionsAlert({
            show: true,
            severity: 'success',
            msj: 'Modificado con éxito!',
          });
          reset();
          setNewProduct(true);
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
      ProductServices.create(values)
        .then((response) => {
          setOptionsAlert({
            show: true,
            severity: 'success',
            msj: 'Guardado con éxito!',
          });
          reset();
          setNewProduct(true);
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
      name: '',
      generic_name: '',
      location: '',
      strenght: '',
      min_stock: '',
      box_size: '',
      unit: '',
      details: '',
      category_id: '',
      provider_id: '',
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
      <Button
        variant='contained'
        color='primary'
        startIcon={<AddIcon />}
        onClick={handleClickOpen('paper')}
      >
        Agregar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        {isLoading && <LinearProgress />}
        <AlertComponent optionsAlert={optionsAlert} />

        <DialogTitle id='scroll-dialog-title'>
          {titleDialog} Producto
        </DialogTitle>

        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id='scroll-dialog-description'
            ref={descriptionElementRef}
            tabIndex={-1}
          ></DialogContentText>

          <form className={classes.root} noValidate autoComplete='off'>
            <TextField
              name='name'
              label='Nombre'
              autoComplete='current-password'
              variant='outlined'
              value={name}
              onChange={handleInputChange}
            />
            <TextField
              name='generic_name'
              value={generic_name}
              label='Nombre Genérico'
              autoComplete='current-password'
              variant='outlined'
              onChange={handleInputChange}
            />
            <TextField
              name='strenght'
              value={strenght}
              label='Vol. Sustancia'
              autoComplete='current-password'
              variant='outlined'
              onChange={handleInputChange}
            />
            <TextField
              name='location'
              value={location}
              label='Ubicación'
              autoComplete='current-password'
              variant='outlined'
              onChange={handleInputChange}
            />
            <TextField
              name='min_stock'
              value={min_stock}
              label='Stock Minimo'
              autoComplete='current-password'
              variant='outlined'
              onChange={handleInputChange}
            />
            <TextField
              name='box_size'
              value={box_size}
              label='Cantidad por Caja'
              autoComplete='current-password'
              variant='outlined'
              onChange={handleInputChange}
            />
            <TextField
              name='unit'
              value={unit}
              label='Unidad'
              autoComplete='current-password'
              variant='outlined'
              onChange={handleInputChange}
            />
            <TextField
              name='details'
              value={details}
              label='Descripción'
              multiline
              rowsMax={4}
              variant='outlined'
              onChange={handleInputChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          {isLoading ? (
            <>
              <Button color='primary' disabled>
                Cancelar
              </Button>
              <Button color='primary' disabled>
                Guardar
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button onClick={handleSubmit} color='primary'>
                Guardar
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

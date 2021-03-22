import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BombeoServices from '../../services/BombeoServices';

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});

export default function TableProforma({idCustomer}) {
  const [data, setData] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    retrieveContactos();
  }, []);

  const retrieveContactos = () => {
    BombeoServices.get(idCustomer)
      .then((response) => {
        setData(response.data[0].proforma);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // var totalAmount = data.reduce(
  //   (sum, value) => (typeof value.price == 'number' ? sum + value.price : sum),
  //   0
  // );

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='spanning table'>
        <TableHead>
          <TableRow>
            <TableCell align='center' colSpan={12}>
              Proforma
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align='right'>Precio</TableCell>
            <TableCell align='right'>Cantidad</TableCell>
            <TableCell align='right'>Sub-Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(
            (row) =>
              row.price > 0 && (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align='right'>{row.priceUnit}</TableCell>
                  <TableCell align='right'>{row.qty}</TableCell>
                  <TableCell align='right'>{row.price}</TableCell>
                </TableRow>
              )
          )}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>TOTAL</TableCell>
            {/* <TableCell align='right'>{totalAmount}</TableCell> */}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

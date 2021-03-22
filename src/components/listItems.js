import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {NavLink} from 'react-router-dom';

export const mainListItems = (
  <div>
    <NavLink className='navMenu' to='/'>
      <ListItem button>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary='Bombeo' />
      </ListItem>
    </NavLink>
	<NavLink className='navMenu' to='/termosolares'>
      <ListItem button>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary='Termosolares' />
      </ListItem>
    </NavLink>
    <NavLink className='navMenu' to='/piscinas'>
      <ListItem button>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary='Piscinas' />
      </ListItem>
    </NavLink>
    <NavLink className='navMenu' to='/potencias'>
      <ListItem button>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary='Potencias' />
      </ListItem>
    </NavLink>
    {/* <NavLink className='navMenu' to='/products'>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary='Productos' />
      </ListItem>
    </NavLink> */}
  </div>
);

export const secondaryListItems = (
  <div>
    <NavLink className='navMenu' to='/login'>
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary='Salir' />
      </ListItem>
    </NavLink>
  </div>
);

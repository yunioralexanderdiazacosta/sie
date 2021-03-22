import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Bombeo from '../components/bombeo/Bombeo';
import Termosolar from '../components/termosolar/Termosolar';
import Piscina from '../components/piscina/Piscina';
import Potencia from '../components/potencia/Potencia';
// import Products from '../components/products/Products';
const DashboardRouter = () => {
  return (
    <>
      <div>
        <Switch>
          <Route exact path='/' component={Bombeo} />
          <Route exact path='/termosolares' component={Termosolar} />
          <Route exact path='/piscinas' component={Piscina} />
          <Route exact path='/potencias' component={Potencia} />
          {/* <Route exact path='/' component={Customers} /> */}
        </Switch>
      </div>
    </>
  );
};
export default DashboardRouter;

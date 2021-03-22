import {useState, useEffect} from 'react';
import ProductServices from '../services/ProductServices';

export const useRetrieveProducts = (id) => {
  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    ProductServices.get(id).then(({data}) => {
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
      } = data;
      setState({
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
        loading: false,
      });
    });
  }, [id]);

  return state; // { data:[], loading: true };
};

// let count = 1;
export const col = [
  // {
  //   name: 'ID',
  //   selector: 'id',
  //   sortable: true,
  //   cell: (d) => <span>{count++}</span>,
  // },
  {
    name: 'ID',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'NOMBRE',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'CONCENTRACION',
    selector: 'strenght',
    sortable: true,
  },
  {
    name: 'COSTO',
    selector: 'cost',
    sortable: true,
    //   cell: d => <span>{d.genres.join(', ')}</span>,
  },
  {
    name: 'PRECIO',
    selector: 'price',
    sortable: true,
  },
  {
    name: 'CATEGORIA',
    selector: 'category_id.name',
    sortable: true,
  },
];

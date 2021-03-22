let count = 1;
export const col = [
  // {
  //   name: 'ID',
  //   selector: 'id',
  //   sortable: true,
  //   cell: (d) => <span>{count++}</span>,
  // },
  {
    name: 'Nro',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'FECHA',
    selector: 'created_at',
    sortable: true,
    cell: (d) => <span>{d.created_at.slice(0, -8)}</span>,
  },
  {
    name: 'NOMBRE',
    selector: 'nombre',
    sortable: true,
  },
  {
    name: 'EMPRESA',
    selector: 'empresa',
    sortable: true,
    //   cell: d => <span>{d.genres.join(', ')}</span>,
  },
  {
    name: 'CIUDAD',
    selector: 'municipio',
    sortable: true,
  },
  {
    name: 'USO',
    selector: 'aplicacion',
    sortable: true,
  },
];

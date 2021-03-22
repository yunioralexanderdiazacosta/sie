export const col = [
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
      selector: 'Nombre',
      sortable: true,
    },
    {
      name: 'EMPRESA',
      selector: 'Empresa',
      sortable: true,
    },
    {
      name: 'CIUDAD',
      selector: 'Ciudad',
      sortable: true,
    },
    {
      name: 'MUNICIPIO',
      selector: 'Municipio',
      sortable: true,
    },
];
  
import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  {
    field: 'username',
    headerName: 'Username',
    flex: 1,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'first_name',
    headerName: 'First Name',
    flex: 1,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'last_name',
    headerName: 'Last Name',
    flex: 1,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'role',
    headerName: 'Role(s)',
    flex: 1,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      const role = params.formattedValue.name;
      return role;
    },
  },
];

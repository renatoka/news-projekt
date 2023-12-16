import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Title',
    flex: 1,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'user_authors',
    headerName: 'Author',
    flex: 0.5,
    editable: false,
    renderCell: (params) => {
      const author = params.row.user_authors[0];
      return `${author.user.first_name} ${author.user.last_name}`;
    },
  },
  {
    field: 'approval_state',
    headerName: 'State',
    flex: 0.5,
    editable: false,
  },
  {
    field: 'created_at',
    headerName: 'Time Created',
    flex: 0.5,
    editable: false,
    renderCell: (params) => {
      const date = new Date(
        new Date(params.row.created_at).toISOString().split('T')[0],
      ).toLocaleDateString('hr-HR');
      return date;
    },
  },
  {
    field: 'statistics',
    headerName: 'Statistics',
    flex: 1,
    editable: false,
    renderCell: (params) => {
      const { likes, dislikes, views } = params.row.statistics[0];
      return `${likes} likes, ${dislikes} dislikes, ${views} views`;
    },
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    editable: false,
  },
];

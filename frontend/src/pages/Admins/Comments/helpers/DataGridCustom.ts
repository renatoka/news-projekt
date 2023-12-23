import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  {
    field: 'content',
    headerName: 'Content',
    flex: 1,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
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
    field: 'user',
    headerName: 'Author',
    flex: 1,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      const user = params.row.user;
      return `${user.first_name} ${user.last_name}`;
    },
  },
  {
    field: 'article',
    headerName: 'Article',
    flex: 1,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      const article = params.row.article;
      return article.title;
    },
  },
];

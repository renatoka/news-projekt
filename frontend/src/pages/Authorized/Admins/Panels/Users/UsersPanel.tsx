import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { User } from '../../../../../../../src/handlers/users/entities/user.entity';
import { getUsers } from '../../../../../redux/actions/users.actions';
import { columns } from './helpers/DataGridCustom';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@nextui-org/react';

export const UsersPanel = () => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.users);

  const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  const [query, setQuery] = useState<any>({
    page: 1,
    limit: 10,
    sort: 'id',
    order: 'DESC',
    username: '',
    email: '',
    roleId: '',
  });

  columns[0].renderCell = (params) => {
    const user = params.row as User;
    const userLink = `/user/${user.id}`;
    return (
      <Link to={userLink} className="hover:underline hover:underline-offset-2">
        {user.username}
      </Link>
    );
  };
  useEffect(() => {
    if (firstLoad) {
      dispatch(getUsers(query));
      setFirstLoad(false);
    }
  }, [dispatch, firstLoad, query]);

  useEffect(() => {
    if (!users.users) return;
    setCount(users.count);
    setFetchedUsers(users.users);
  }, [users]);

  const GridToolbar = () => {
    return (
      <GridToolbarContainer className="flex justify-between mx-2">
        <div className="flex gap-1 items-center">
          <GridToolbarFilterButton />
          <GridToolbarExport />
        </div>
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
  };

  return loading ? (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <CircularProgress size="lg" label="Loading..." />
    </div>
  ) : (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={fetchedUsers}
        columns={columns}
        rowCount={count}
        pageSizeOptions={[10, 20, 50]}
        paginationMode="server"
        pagination
        paginationModel={{
          page: query.page - 1,
          pageSize: query.limit,
        }}
        checkboxSelection
        loading={loading}
        disableRowSelectionOnClick
        onSortModelChange={(model) => {
          setQuery({ ...query, sort: model[0].field, order: model[0].sort });
          dispatch(
            getUsers({ ...query, sort: model[0].field, order: model[0].sort }),
          );
        }}
        onPaginationModelChange={(model) => {
          setQuery({ ...query, page: model.page + 1, limit: model.pageSize });
          dispatch(
            getUsers({
              ...query,
              page: model.page + 1,
              limit: model.pageSize,
            }),
          );
        }}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </div>
  );
};

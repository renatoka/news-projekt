import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { columns } from './helpers/DataGridCustom';
import { getComments } from '../../../../../redux/actions/comments.actions';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@nextui-org/react';

export const CommentsPanel = () => {
  const dispatch = useAppDispatch();
  const { comments, loading } = useAppSelector((state) => state.comments);

  const [fetchedComments, setFetchedComments] = useState<Comment[]>([]);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  const [query, setQuery] = useState<any>({
    page: 1,
    limit: 10,
    sort: 'id',
    order: 'DESC',
    username: '',
  });

  useEffect(() => {
    if (firstLoad) {
      dispatch(getComments(query));
      setFirstLoad(false);
    }
  }, [dispatch, firstLoad, query]);

  useEffect(() => {
    if (!comments.comments) return;
    setCount(comments.count);
    setFetchedComments(comments.comments);
  }, [comments]);

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

  columns[2].renderCell = (params) => {
    const comment = params.row;
    const userLink = `/admin/user/${comment.user_id}`;
    return (
      <Link to={userLink} className="hover:underline hover:underline-offset-2">
        {comment.user.first_name} {comment.user.last_name}
      </Link>
    );
  };

  return loading ? (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <CircularProgress size="lg" label="Loading..." />
    </div>
  ) : (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={fetchedComments}
        columns={columns}
        rowCount={count}
        pageSizeOptions={[10, 20, 50]}
        paginationMode="server"
        paginationModel={{
          page: query.page - 1,
          pageSize: query.limit,
        }}
        pagination
        checkboxSelection
        loading={loading}
        disableRowSelectionOnClick
        onSortModelChange={(model) => {
          setQuery({ ...query, sort: model[0].field, order: model[0].sort });
          dispatch(
            getComments({
              ...query,
              sort: model[0].field,
              order: model[0].sort,
            }),
          );
        }}
        onPaginationModelChange={(model) => {
          setQuery({ ...query, page: model.page + 1, limit: model.pageSize });
          dispatch(
            getComments({
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

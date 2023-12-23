import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { columns } from './helpers/DataGridCustom';
import { getComments } from '../../../redux/actions/comments.actions';

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
  }, [dispatch]);

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

  return (
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

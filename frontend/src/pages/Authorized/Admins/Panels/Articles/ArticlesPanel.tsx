import { useEffect, useState } from 'react';
import { Article } from '../../../../../../../src/handlers/articles/entities/article.entity';
import { useAppSelector, useAppDispatch } from '../../../../../redux/hooks';
import { getArticlesAdmin } from '../../../../../redux/actions/articles.actions';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { columns } from './helpers/DataGridCustom';
import { reviewArticle } from '../../../../../redux/actions/articles.actions';
import { Button, ButtonGroup, CircularProgress } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';

export const ArticlesPanel = () => {
  const dispatch = useAppDispatch();

  const [news_articles, setNewsArticles] = useState<Article[]>([]);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  const [query, setQuery] = useState<any>({
    page: 1,
    limit: 10,
    sort: 'id',
    order: 'DESC',
    approval_state: 'all',
  });
  const { articles, loading } = useAppSelector((state) => state.articlesAdmin);
  const { user } = useAppSelector((state) => state.loggedUser);

  useEffect(() => {
    if (firstLoad) {
      dispatch(getArticlesAdmin(query));
      setFirstLoad(false);
    }
  }, [dispatch, firstLoad, query]);

  useEffect(() => {
    if (!articles.articles) return;
    setCount(articles.count);
    setNewsArticles(articles.articles);
  }, [articles]);

  columns[0].renderCell = (params) => {
    const article = params.row as Article;
    const articleLink = `/preview/${article.category.name}/${article.slug}/${article.id}`;
    return (
      <Link to={articleLink} className="hover:underline">
        {article.title}
      </Link>
    );
  };

  columns[columns.length - 1].renderCell = (params) => {
    const article = params.row as Article;
    switch (article.approval_state) {
      case 'pending':
        return (
          <div>
            <ButtonGroup>
              <Button
                variant="solid"
                size="sm"
                color="primary"
                onClick={() => {
                  dispatch(reviewArticle(article.id, 'approved')).then(() => {
                    dispatch(getArticlesAdmin(query));
                  });
                }}
              >
                Approve
              </Button>
              <Button
                variant="solid"
                size="sm"
                color="danger"
                onClick={() => {
                  dispatch(reviewArticle(article.id, 'rejected')).then(() => {
                    dispatch(getArticlesAdmin(query));
                  });
                }}
              >
                Reject
              </Button>
            </ButtonGroup>
          </div>
        );
      case 'approved':
        return (
          <Button
            variant="solid"
            size="sm"
            color="danger"
            onClick={() => {
              dispatch(reviewArticle(article.id, 'rejected')).then(() => {
                dispatch(getArticlesAdmin(query));
              });
            }}
          >
            Reject
          </Button>
        );
      case 'rejected':
        return (
          <Button
            variant="solid"
            size="sm"
            color="primary"
            onClick={() => {
              dispatch(reviewArticle(article.id, 'approved')).then(() => {
                dispatch(getArticlesAdmin(query));
              });
            }}
          >
            Approve
          </Button>
        );
      default:
        break;
    }
  };

  const GridToolbar = () => {
    return (
      <GridToolbarContainer className="flex justify-between mx-2">
        <div className="flex items-center">
          <GridToolbarFilterButton />
          <GridToolbarExport />
          {user.role_name === 'editor' && (
            <div className="px-[5px] py-[4px] hover:bg-[#1975d20a] rounded-[4px] cursor-pointer">
              <CreateIcon
                fontSize="small"
                className="text-[#1976d2] text-[0.8125rem] mr-[6px]"
              />
              <Link
                to="/articles/create"
                className="text-[#1976d2] text-[0.8125rem]"
              >
                CREATE
              </Link>
            </div>
          )}
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
        rows={news_articles}
        columns={columns}
        rowCount={count}
        loading={loading}
        pageSizeOptions={[10, 20, 50]}
        paginationMode="server"
        pagination
        paginationModel={{
          page: query.page - 1,
          pageSize: query.limit,
        }}
        onSortModelChange={(model) => {
          setQuery({ ...query, sort: model[0].field, order: model[0].sort });
          dispatch(
            getArticlesAdmin({
              ...query,
              sort: model[0].field,
              order: model[0].sort,
            }),
          );
        }}
        onPaginationModelChange={(model) => {
          setQuery({ ...query, page: model.page + 1, limit: model.pageSize });
          dispatch(
            getArticlesAdmin({
              ...query,
              page: model.page + 1,
              limit: model.pageSize,
            }),
          );
        }}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </div>
  );
};

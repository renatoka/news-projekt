import { useEffect, useState } from 'react';
import { Article } from '../../../../../src/handlers/articles/entities/article.entity';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { getArticles } from '../../../redux/actions/articles.actions';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './helpers/DataGridCustom';
import { reviewArticle } from '../../../redux/actions/articles.actions';
import { Button, ButtonGroup } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export const ArticlesPanel = () => {
  const dispatch = useAppDispatch();

  const [news_articles, setNewsArticles] = useState<Article[]>([]);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  const { articles } = useAppSelector((state) => state.articles);

  useEffect(() => {
    if (firstLoad) {
      dispatch(getArticles({ approval_state: 'all' }));
      setFirstLoad(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!articles.articles) return;
    setCount(articles.count);
    setNewsArticles(articles.articles);
  }, [articles]);

  columns[0].renderCell = (params) => {
    const article = params.row as Article;
    const articleLink = `/${article.category.name}/${article.slug}/${article.id}`;
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
                    dispatch(getArticles({ approval_state: 'all' }));
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
                    dispatch(getArticles({ approval_state: 'all' }));
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
                dispatch(getArticles({ approval_state: 'all' }));
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
                dispatch(getArticles({ approval_state: 'all' }));
              });
            }}
          >
            Approve
          </Button>
        );
      default:
        return <div></div>;
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={news_articles}
        columns={columns}
        rowCount={count}
        pageSizeOptions={[10, 20, 50]}
        paginationMode="server"
        pagination
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

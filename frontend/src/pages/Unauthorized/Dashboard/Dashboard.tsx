import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getArticles } from '../../../redux/actions/articles.actions';
import { Article } from '../../../../../src/handlers/articles/entities/article.entity';
import { ArticlePreview } from '../../../components/ArticlePreview';
import { useLocation } from 'react-router-dom';

export const Dashboard = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [news_articles, setNewsArticles] = useState<Article[]>([]);
  const { articles } = useAppSelector((state) => state.articles);

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        dispatch(getArticles({ approval_state: 'approved' }));
        break;
      case /\w+/.test(location.pathname) ? location.pathname : '':
        dispatch(
          getArticles({
            category: location.pathname.replace('/', ''),
            approval_state: 'approved',
          }),
        );
        break;
      default:
        break;
    }
  }, [location, dispatch]);

  useEffect(() => {
    if (articles) {
      setNewsArticles(articles.articles);
    }
  }, [articles]);

  return (
    <div className="container mx-auto">
      <div className="columns-xs gap-8">
        {news_articles.map((article) => (
          <ArticlePreview key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

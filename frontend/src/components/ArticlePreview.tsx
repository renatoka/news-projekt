import { Link } from 'react-router-dom';
import { Article } from '../../../src/handlers/articles/entities/article.entity';
import { Skeleton } from '@nextui-org/react';
import { useAppSelector } from '../redux/hooks';

export const ArticlePreview = ({ article }: { article: Article }) => {
  const articleLink = `/${article.category.name}/${article.slug}/${article.id}`;
  const { loading } = useAppSelector((state) => state.articles);

  return (
    <Link to={articleLink}>
      <div
        key={article.id}
        className="overflow-hidden mb-5 hover:shadow-xl transition-shadow duration-300"
      >
        <Skeleton isLoaded={!loading}>
          <img src={article.image} alt={article.title} className="w-full" />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {article.title}
            </h2>
            <p className="mt-2 text-gray-600">{article.description}</p>
          </div>
        </Skeleton>
      </div>
    </Link>
  );
};

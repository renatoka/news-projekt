import { Avatar, Skeleton, Textarea, Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Article } from '../../../src/handlers/articles/entities/article.entity';
import { getArticle } from '../redux/actions/articles.actions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { SingleComment } from './SingleComment';

export const SingleArticle = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ slug: string; id: string }>();
  const [news_article, setNewsArticle] = useState<Article>();

  const { article, loading } = useAppSelector((state) => state.article);

  useEffect(() => {
    if (id) {
      dispatch(getArticle(+id));
    }
  }, [id]);

  useEffect(() => {
    if (article) {
      setNewsArticle(article as Article);
    }
  }, [article]);

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full h-full">
            <Skeleton isLoaded={!loading}>
              <img
                src={news_article?.image}
                alt={news_article?.title}
                className="w-full"
              />
            </Skeleton>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col">
              <Skeleton isLoaded={!loading}>
                <h1 className="text-3xl font-bold mb-1">
                  {news_article?.title}
                </h1>
                <p className="text-base">{news_article?.description}</p>
              </Skeleton>
            </div>
            <Skeleton isLoaded={!loading}>
              <p className="text-lg">{news_article?.content}</p>
            </Skeleton>
            <Skeleton isLoaded={!loading} className="mt-auto ml-auto">
              {news_article?.user_authors?.map((author, index) => (
                <div key={index} className="flex flex-row gap-2">
                  <p className="text-lg">
                    {author.user.first_name} {author.user.last_name}
                  </p>
                  <Avatar src={author.user.first_name} size="md" />
                </div>
              ))}
            </Skeleton>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col w-full">
            <Skeleton isLoaded={!loading}>
              <h1 className="text-2xl font-bold mb-5">
                Comments {news_article?.comments?.length}
              </h1>
              {news_article?.comments?.map((comment: any) => (
                <SingleComment comment={comment} key={comment.id} />
              ))}
              <div className="flex flex-col gap-5 mb-5">
                <h1 className="text-2xl font-bold">Add comment</h1>
                <Textarea
                  placeholder="Add comment"
                  width="100%"
                  height="100px"
                />
                <Button color="primary">Add comment</Button>
              </div>
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};

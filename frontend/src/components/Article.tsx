import { Avatar, Skeleton, Textarea, Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Article } from '../../../src/handlers/articles/entities/article.entity';
import { getArticle } from '../redux/actions/articles.actions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { SingleComment } from './SingleComment';
import { createComment } from '../redux/actions/comments.actions';

export const SingleArticle = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ slug: string; id: string }>();
  const [notLoggedIn, setNotLoggedIn] = useState<boolean>(false);
  const [news_article, setNewsArticle] = useState<Article>();
  const [errors, setErrors] = useState<{
    content: string;
    user_id: string;
  }>({
    content: '',
    user_id: '',
  });
  const [inputs, setInputs] = useState<{
    content: string;
    user_id: string;
    article_id: number;
  }>({
    content: '',
    user_id: '',
    article_id: 0,
  });

  const { article, loading } = useAppSelector((state) => state.article);
  const { user } = useAppSelector((state) => state.loggedUser);
  const { success } = useAppSelector((state) => state.createComment);

  useEffect(() => {
    if (id) {
      dispatch(getArticle(+id));
      setInputs((prev) => ({
        ...prev,
        article_id: +id,
      }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (user) {
      setInputs((prev) => ({
        ...prev,
        user_id: user.id,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      setNotLoggedIn(true);
    }
  }, [user]);

  useEffect(() => {
    if (article) {
      setNewsArticle(article);
    }
  }, [article]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({ type: 'CREATE_COMMENT_RESET' });
        window.location.reload();
      }, 2000);
    }
  }, [success, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    let errorsObj: {
      content: string;
      user_id: string;
    } = {
      content: '',
      user_id: '',
    };
    for (const [key, value] of Object.entries(inputs)) {
      if (!value) {
        errorsObj[key as keyof typeof errorsObj] = 'This field is required';
      }
    }
    for (const [_, value] of Object.entries(errorsObj)) {
      if (value) {
        setErrors(errorsObj);
        return;
      }
    }
    dispatch(createComment(inputs));
  };

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
                  <Avatar src={author.user.image} size="md" />
                </div>
              ))}
            </Skeleton>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col w-full">
            <Skeleton isLoaded={!loading}>
              {news_article?.comments?.length != 0 && (
                <>
                  <h1 className="text-2xl font-bold mb-5">
                    Comments {news_article?.comments?.length}
                  </h1>
                  {news_article?.comments?.map((comment: any) => (
                    <SingleComment key={comment.id} comment={comment} />
                  ))}
                </>
              )}
              <div className="flex flex-col gap-5 mb-5">
                <h1 className="text-2xl font-bold">Add comment</h1>
                <Textarea
                  placeholder="Add comment"
                  width="100%"
                  height="100px"
                  onChange={handleChange}
                  name="content"
                  value={inputs.content}
                  errorMessage={errors.content}
                  isRequired
                  required
                />
                <Button
                  color="primary"
                  onClick={handleSubmit}
                  isDisabled={notLoggedIn}
                >
                  {notLoggedIn ? 'You must be logged in to comment' : 'Submit'}
                </Button>
              </div>
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};

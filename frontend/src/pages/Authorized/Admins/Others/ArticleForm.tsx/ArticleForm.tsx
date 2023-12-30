import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../../../redux/hooks';
import {
  Input,
  Button,
  Textarea,
  Select,
  SelectItem,
  CircularProgress,
} from '@nextui-org/react';
import { getAllCategories } from '../../../../../redux/actions/categories.actions';
import { Category } from '../../../../../../../src/handlers/categories/entities/category.entity';
import { createArticle } from '../../../../../redux/actions/articles.actions';
export const ArticleForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.loggedUser);
  const { categories } = useAppSelector((state) => state.categories);
  const { loading, success } = useAppSelector((state) => state.createArticle);

  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    content?: string;
    category_id?: string;
  }>({});
  const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    content: '',
    image: 'https://picsum.photos/640/480',
    approval_state: 'pending',
    category_id: '',
    user_id: '',
  });

  useEffect(() => {
    if (categories.categories) {
      const categoriesArray: Category[] = [];
      categories.categories.forEach((category: Category) => {
        const categoryObj = {
          ...category,
          name: category.name.charAt(0).toUpperCase() + category.name.slice(1),
        };
        categoriesArray.push(categoryObj);
      });
      setFetchedCategories(categoriesArray);
    }
  }, [categories]);

  useEffect(() => {
    if (user) {
      setInputs({ ...inputs, user_id: user.id });
    }
  }, [user]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleSubmit = () => {
    let errorsObj: {
      title: string;
      description: string;
      content: string;
      category_id?: string;
    } = {
      title: '',
      description: '',
      content: '',
      category_id: '',
    };
    for (const [key, value] of Object.entries(inputs)) {
      if (!value) {
        errorsObj[key as keyof typeof errorsObj] = 'This field is required';
      }
    }
    if (Object.keys(errorsObj).length > 0) {
      setErrors(errorsObj);
      return;
    }
    dispatch(createArticle(inputs));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({ type: 'CREATE_ARTICLE_RESET' });
        navigate('/articles');
      }, 2000);
    }
  }, [success, dispatch]);

  const handleChange = (e: any) => {
    if (e.target.name === 'category_id') {
      setInputs({ ...inputs, [e.target.name]: +e.target.value });
      return;
    }
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <>
      {loading || success ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CircularProgress
            size="lg"
            label={
              success
                ? 'Successfully created article. Redirecting...'
                : 'Loading...'
            }
          />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row w-full gap-3">
          <div className="flex flex-col gap-5 md:w-1/2">
            <h1 className="text-3xl font-bold">Create Article</h1>
            <div className="flex flex-col gap-2">
              <Input
                label="Title"
                name="title"
                value={inputs.title}
                onChange={handleChange}
                isRequired
                required
                errorMessage={errors.title}
              />
              <Input
                label="Description"
                name="description"
                value={inputs.description}
                onChange={handleChange}
                isRequired
                required
                errorMessage={errors.description}
              />
              <Textarea
                label="Content"
                name="content"
                value={inputs.content}
                onChange={handleChange}
                isRequired
                required
                errorMessage={errors.content}
              />
              <Select
                label="Category"
                name="category_id"
                value={inputs.category_id}
                placeholder="Select a category"
                onChange={handleChange}
                isRequired
                required
                errorMessage={errors.category_id}
              >
                {fetchedCategories.map((category: Category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex items-start gap-2">
              <Button color="primary" type="submit" onClick={handleSubmit}>
                Create
              </Button>
              <Link to="/articles">
                <Button color="danger" type="button">
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

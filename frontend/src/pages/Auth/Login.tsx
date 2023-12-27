import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useState, useEffect } from 'react';
import { validateFields } from './helpers/ValidateFields';
import { loginAccount } from '../../redux/actions/auth.actions';
import { CircularProgress } from '@nextui-org/react';

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [redirecting, setRedirecting] = useState<boolean>(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{
    [key: string]: string | string[];
  }>({
    email: '',
    password: '',
  });

  const { access_token, success, error } = useAppSelector(
    (state) => state.login,
  );

  useEffect(() => {
    if (access_token != '') {
      localStorage.setItem('access_token', access_token);
      setRedirecting(true);
    }
  }, [access_token]);

  useEffect(() => {
    if (success === true) {
      setRedirecting(true);
    }
  }, [success]);

  useEffect(() => {
    if (redirecting) {
      setTimeout(() => {
        dispatch({ type: 'LOGIN_ACCOUNT_RESET' });
        setRedirecting(false);
        navigate('/');
      }, 3000);
    }
  }, [redirecting]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const errors = validateFields(inputs);
    if (errors == false) {
      dispatch(loginAccount(inputs));
    } else {
      setErrors(errors);
    }
  };

  return redirecting ? (
    <div className="flex w-screen h-screen justify-center items-center">
      <CircularProgress
        size="lg"
        label={'Successfully logged in. Redirecting...'}
      />
    </div>
  ) : (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
              {errors.email && (
                <p className="my-2 text-sm text-red-600" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
              {errors.password && (
                <p className="my-2 text-sm text-red-600" id="email-error">
                  {errors.password}
                </p>
              )}
            </div>
          </div>
          {error.message != '' && (
            <p className="my-2 text-sm text-red-600" id="email-error">
              {error.message == 'USER_NOT_FOUND' && 'User not found.'}
              {error.message == 'INVALID_CREDENTIALS' && 'Invalid password.'}
            </p>
          )}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </div>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link
            to={'/register'}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register here.
          </Link>
        </p>
      </div>
    </div>
  );
};

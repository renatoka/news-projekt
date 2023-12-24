import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { registerAccount } from '../../redux/actions/auth.actions';
import { validateFields } from './helpers/ValidateFields';
import { CircularProgress } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [label, setLabel] = useState<string>('');
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const [inputs, setInputs] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    role_id: 2,
  });
  const [errors, setErrors] = useState<{
    [key: string]: string | string[];
  }>({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
  });

  const { success } = useAppSelector((state) => state.register);

  useEffect(() => {
    if (success === true) {
      setLabel('Successfully registered. Redirecting...');
      setRedirecting(true);
    }
  }, [success]);

  useEffect(() => {
    if (redirecting) {
      setTimeout(() => {
        dispatch({ type: 'REGISTER_ACCOUNT_RESET' });
        setRedirecting(false);
        navigate('/login');
      }, 3000);
    }
  }, [redirecting]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const errors = validateFields(inputs);
    if (errors == false) {
      dispatch(registerAccount(inputs));
      setLabel('Registering...');
    } else {
      setErrors(errors);
    }
  };

  return redirecting ? (
    <div className="flex w-screen h-screen justify-center items-center">
      <CircularProgress size="lg" label={label} />
    </div>
  ) : (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register for an account
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <label
            htmlFor="first_name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            First Name
          </label>
          <div className="mt-1">
            <input
              id="first_name"
              name="first_name"
              type="text"
              autoComplete="first_name"
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleChange}
            />
            {errors.first_name && (
              <p className="my-2 text-sm text-red-600" id="email-error">
                {errors.first_name}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Last Name
          </label>
          <div className="mt-1">
            <input
              id="last_name"
              name="last_name"
              type="text"
              autoComplete="last_name"
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleChange}
            />
            {errors.last_name && (
              <p className="my-2 text-sm text-red-600" id="email-error">
                {errors.last_name}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Username
          </label>
          <div className="mt-1">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleChange}
            />
            {errors.username && (
              <p className="my-2 text-sm text-red-600" id="email-error">
                {errors.username}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-1">
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
          <div className="mt-1">
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
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

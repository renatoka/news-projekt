// Create a function that will validate the given input fields from register and login pages
export const validateFields = (field: any) => {
  let errors: { [key: string]: string } = {
    email: '',
    password: '',
    username: '',
    first_name: '',
    last_name: '',
  };
  for (const key in field) {
    if (key === 'email') {
      if (!field[key]) {
        errors[key] = 'This field is required';
      } else if (!/\S+@\S+\.\S+/.test(field[key])) {
        errors[key] = 'Invalid email address';
      }
    } else if (key === 'password') {
      if (!field[key]) {
        errors[key] = 'This field is required';
      } else if (field[key].length < 6) {
        errors[key] = 'Password must be at least 6 characters';
      }
    } else {
      if (!field[key]) {
        errors[key] = 'This field is required';
      }
    }
  }
  if (
    errors.email === '' &&
    errors.password === '' &&
    errors.username === '' &&
    errors.first_name === '' &&
    errors.last_name === ''
  ) {
    return false;
  } else {
    return errors;
  }
};

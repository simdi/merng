const validateRegisterInput = ({ username, email, password }) => {
  const errors = {};
  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }

  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /()$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email';
    }
  }

  if (password === '') {
    errors.password = 'Password must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
};

module.exports = validateRegisterInput;
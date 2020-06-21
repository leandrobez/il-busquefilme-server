const Joi = require('@hapi/joi');

/**LOGIN */
const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};

/**REGISTER VALIDATION */
const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .max(30)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
    role: Joi.string().required()
  });
  return schema.validate(data);
};

/**CPF */
//validate CPF
//function validators
const calcChecker1 = (firstNineDigits) => {
  let sum = null;
  for (let j = 0; j < 9; ++j) {
    sum += firstNineDigits.toString().charAt(j) * (10 - j);
  }
  let lastSumChecker1 = sum % 11,
    checker1 = lastSumChecker1 < 2 ? 0 : 11 - lastSumChecker1;
  return checker1;
};

const calcChecker2 = (cpfWithChecker1) => {
  let sum = null;
  for (let k = 0; k < 10; ++k) {
    sum += cpfWithChecker1.toString().charAt(k) * (11 - k);
  }
  let lastSumChecker2 = sum % 11,
    checker2 = lastSumChecker2 < 2 ? 0 : 11 - lastSumChecker2;
  return checker2;
};

/** CPF VALIDATION **/
const isValidCPF = (cpf) => {
  //prepare cpf
  if (cpf === '') {
    return false;
  }

  //break string
  let firstNineDigits = cpf.substring(0, 9),
    checker = cpf.substring(9, 11);

  // Checking if all digits are equal
  for (let i = 0; i < 10; i++) {
    if ('' + firstNineDigits + checker === Array(12).join(i)) {
      return false;
    }
  }

  let checker1 = calcChecker1(firstNineDigits),
    checker2 = calcChecker2('' + firstNineDigits + checker1);

  if (checker.toString() === checker1.toString() + checker2.toString()) {
    return true;
  } else {
    return false;
  }
};

/**CUSTOMER REGISTER VALIDATION */
const customerRegisterValidation = (data) => {
  /**.regex(
        /^[A-Za-z0-9_\\-]+(?:[.][A-Za-z0-9_\\-]+)*@[A-Za-z0-9_]+(?:[-.][A-Za-z0-9_]+)*\\.[A-Za-z0-9_]+$/
      ) */
  const checkSchema = Joi.object({
    name: Joi.string()
      .min(1)
      .max(255)
      .required()
      .regex(/^[ ]*(.+[ ]+)+.+[ ]*$/i),
    cpf: Joi.string().required().min(11).max(11),
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email()
      .regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i),
    phone_number: Joi.string()
      .max(12)
      .regex(/^[1-9]{2}9?[0-9]{8}$/i),
    birth: Joi.string().regex(
      /^[12][0-9]{3}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/
    ),
    address: {
      street: Joi.string().required().min(0).max(200),
      number: Joi.string().required().min(0).max(55),
      neighborhood: Joi.string().required().min(0).max(255),
      zipcode: Joi.string()
        .required()
        .regex(/^[0-9]{8}$/),
      city: Joi.string().required().min(0).max(50),
      complement: Joi.string().min(0).max(100),
      state: Joi.string()
        .required()
        .regex(
          /^(?:A[CLPM]|BA|CE|DF|ES|GO|M[ATSG]|P[RBAEI]|R[JNSOR]|S[CEP]|TO)$/
        ),
    },
  });

  const { error, value } = checkSchema.validate(data);
  if (error) {
    return {
      error: true,
      message: {
        type: 'warning',
        value: error.details[0].message,
      },
    };
  }
  return {
    error: false,
  };
};
module.exports.isValidCPF = isValidCPF;
module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
module.exports.customerRegisterValidation = customerRegisterValidation;

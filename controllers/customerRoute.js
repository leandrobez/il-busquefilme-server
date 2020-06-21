const router = require('express').Router();
const Customer = require('../models/Customer');

//validation
const {
  customerRegisterValidation,
  isValidCPF,
} = require('../helpers/validation');

console.log('⚙️ Create all routes to customer');
//register especific student
router.post('/register', async (req, res) => {
  let addressRegister = {
    street: req.body.address.street,
    number: req.body.address.number,
    neighborhood: req.body.address.neighborhood,
    zipcode: req.body.address.zipcode,
    city: req.body.address.city,
    complement: req.body.address.complement,
    state: req.body.address.state,
  };
  let customerRegister = {
    name: req.body.name,
    cpf: req.body.cpf,
    email: req.body.email,
    phone_number: req.body.phone_number,
    birth: req.body.birth,
    address: addressRegister,
  };

  //validation persoanl register
  let check = isValidCPF(customerRegister.cpf);
  //if false cpf invalid
  if (!check) {
    return res.json({
      error: true,
      message: {
        type: 'warning',
        value: 'Esse CPF não existe. Por favor verifique o valor digitado.',
      },
    });
  }

  const result = customerRegisterValidation(customerRegister);
  if (result.error) {
    return res.json({
      error: true,
      message: {
        type: result.message.type,
        value: result.message.value,
      },
    });
  }
  //no error validation
  //chek if customer exist
  const emailExist = await Customer.findOne({ email: req.body.email });

  if (emailExist) {
    return res.json({
      error: true,
      customer: emailExist,
      message: {
        type: 'warning',
        value:
          'Esse email já existe. Isso significa que você já está cadastrado',
      },
    });
  } else {
    //register customer
    const newCustomer = new Customer(customerRegister);
    try {
      const save = await newCustomer.save();
      return res.json({
        error: false,
        customer: newCustomer,
      });
    } catch (error) {
      return res.json({
        error: true,
        message: {
          type: 'danger',
          value: error.message,
        },
      });
    }
  }
});

module.exports = router;

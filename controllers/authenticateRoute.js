const router = require('express').Router(),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  User = require('../models/User');

const { loginValidation } = require('../helpers/validation');

console.log(`§ § § Create all route to user authenticate § § §`);

//route login
router.post('/login', async (req, res) => {
  //validate data before any request

  const { error } = loginValidation(req.body);
  //console.log(error)
  if (error) {
    return res.json({
      error: true,
      message: { type: 'warning', value: error.details[0].message }
    });
  }
  //no error validation
  //first check the user exist
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.json({
      error: true,
      message: {
        type: 'warning',
        value: 'Nenhum usuário encontrado com o email informado'
      }
    });
  }
  //if exist user check password
  const hasPwd = await bcrypt.compare(req.body.password, user.password);
  if (!hasPwd) {
    return res.json({
      error: true,
      message: { type: 'warning', value: 'Senha inválida' }
    });
  }
  console.log(user);
  //all is ok
  //hidden password
  user.password = undefined;
  //create toke for user
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24 + 's' //one day
  });
  return res.status(200).json({
    error: null,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      token: token
    }
  });
});

module.exports = router;

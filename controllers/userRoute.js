const router = require('express').Router(),
  bcrypt = require('bcryptjs'),
  User = require('../models/User');

const { registerValidation } = require('../helpers/validation');

console.log(`§ § § Create all route to user register and others actions § § §`);

//register user
router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error) {
    return res.json({
      error: true,
      message: { type: 'warning', value: error.details[0].message },
    });
  }

  //no error validation
  //first check the user exist
  const user = await User.find();
  if (user.length) {
    //check if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res.json({
        error: true,
        message: {
          type: 'warning',
          value: 'Esse email já existe. Tente outro.',
        },
      });
    //Hash passwoards
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //create a new User
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      role: req.body.role,
    });

    try {
      await user.save();
      return res.json({
        error: null,
        user: {
          id: user._id,
          name: user.name,
        },
      });
    } catch (error) {
      return res.json({
        error: true,
        message: {
          type: 'danger',
          value: error.errmsg,
        },
      });
    }
  } else {
    //Hash passwoards
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //create a new User
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      role: req.body.role,
    });

    try {
      await user.save();
      return res.json({
        error: null,
        user: {
          id: user._id,
          name: user.name,
        },
      });
    } catch (error) {
      return res.json({
        error: true,
        message: {
          type: 'danger',
          value: error.errmsg,
        },
      });
    }
  }
});

module.exports = router;

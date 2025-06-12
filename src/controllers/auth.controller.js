const { registerUser, loginUser } = require('../services/auth.service');
const { registerSchema, loginSchema } = require('../validations/auth.validation');

exports.register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const { email, password } = req.body;
    const { accessToken, user } = await loginUser(email, password);
    
    res.json({ accessToken, user });
  } catch (err) {
    next(err);
  }
};
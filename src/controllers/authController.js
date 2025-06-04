const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("../generated/prisma");
const { registerSchema, loginSchema } = require("../utils/validators");

const prisma = new PrismaClient();

exports.register = async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
        preferences: data.preferences,
        age: data.age,
      },
    });
    res.json({ id: user.id, email: user.email });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, preferences: user.preferences, age: user.age },
      process.env.JWT_SECRET
    );
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

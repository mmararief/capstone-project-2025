const { z } = require("zod");

exports.registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  preferences: z.array(z.string()),
  age: z.number().int().min(0).optional(),
});

exports.loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

exports.ratingSchema = z.object({
  value: z.number().min(1).max(5),
});

exports.recommendByPlaceSchema = z.object({
  place_name: z.string(),
  k: z.number().optional(),
});

import Joi, { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
});

const todoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  isCompleted: Joi.boolean(),
  isPublic: Joi.boolean()
});

const genericValidator = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateTodo = genericValidator(todoSchema);

export const validateUser = genericValidator(userSchema);

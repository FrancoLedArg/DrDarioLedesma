import Joi from 'joi'

const id = Joi.number().integer()
const username = Joi.string().alphanum().min(8).max(20)
const password = Joi.string().alphanum().min(8).max(20)

export const getUserSchema = Joi.object({
  id: id.required()
})

export const createUserSchema = Joi.object({
  username: username.required(),
  password: password.required()
})

export const updateUserSchema = Joi.object({
  id: id.required(),
  username: username,
  password: password
})

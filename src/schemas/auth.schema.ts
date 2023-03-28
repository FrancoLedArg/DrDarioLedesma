import Joi from 'joi'

const username = Joi.string().alphanum().min(8).max(16)
const password = Joi.string().alphanum().min(8).max(16)

export const logInSchema = Joi.object({
  username: username.required(),
  password: password.required()
})

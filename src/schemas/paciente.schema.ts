import Joi from 'joi'

const id = Joi.number().integer()
const nombre = Joi.string()
const apellido = Joi.string()
const telefono = Joi.string().alphanum().min(10).max(20)
const id_user = Joi.number().integer()

export const getPacienteSchema = Joi.object({
  id: id.required()
})

export const createPacienteSchema = Joi.object({
  nombre: nombre.required(),
  apellido: apellido.required(),
  telefono: telefono,
  id_user: id_user.required()
})

export const updatePacienteSchema = Joi.object({
  id: id.required(),
  nombre: nombre,
  apellido: apellido,
  telefono: telefono
})

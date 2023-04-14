import Joi from 'joi'

const id = Joi.number().integer()
const ciudad = Joi.string()
const institucion = Joi.string()
const horaRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/
const comienzo = Joi.string().regex(horaRegex)
const final = Joi.string().regex(horaRegex)
const precio = Joi.number().integer()

export const createLugarSchema = Joi.object({
  ciudad: ciudad.required(),
  institucion: institucion.required(),
  comienzo: comienzo,
  final: final,
  precio: precio
})

export const updateLugarSchema = Joi.object({
  id: id.required(),
  ciudad: ciudad,
  institucion: institucion,
  comienzo: comienzo,
  final: final,
  precio: precio
})

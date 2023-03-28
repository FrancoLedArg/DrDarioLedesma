import Joi from 'joi'

const id = Joi.number().integer()
const fecha_y_hora = Joi.date()
const id_paciente = Joi.number().integer()

export const getTurnoSchema = Joi.object({
  id: id.required()
})

export const createTurnoSchema = Joi.object({
  fecha_y_hora: fecha_y_hora.required(),
  id_paciente: id_paciente.required()
})

export const updateTurnoSchema = Joi.object({
  id: id.required(),
  fecha_y_hora: fecha_y_hora.required()
})

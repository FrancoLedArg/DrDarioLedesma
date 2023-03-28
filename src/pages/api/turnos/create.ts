import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

// Middlewares
import validationHandler from '@/middlewares/validation.handler'

// Utils
import { createTurnoSchema } from '@/schemas/turno.schema'

const prisma = new PrismaClient()

async function createHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const {
      fecha_y_hora,
      id_paciente
    } = req.body

    try {
      const turno = await prisma.turno.create({
        data: {
          fecha_y_hora,
          id_paciente
        },
      })

      return res.status(201).json(turno)
    } catch (error) {
      return res.status(404).json({ error: `Turno not found` })
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}

export default validationHandler(createHandler, createTurnoSchema, 'body')

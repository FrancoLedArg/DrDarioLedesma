import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

// Middlewares
import validationHandler from '@/middlewares/validation.handler'

// Utils
import { createPacienteSchema } from '@/schemas/paciente.schema'

const prisma = new PrismaClient()

async function createHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const {
      nombre,
      apellido,
      telefono,
      id_user
    } = req.body

    try {
      const paciente = await prisma.paciente.create({
        data: {
          nombre,
          apellido,
          telefono,
          id_user
        },
      })

      return res.status(201).json(paciente)
    } catch (error) {
      return res.status(404).json({ error: `Paciente not found` })
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}

export default validationHandler(createHandler, createPacienteSchema, 'body')

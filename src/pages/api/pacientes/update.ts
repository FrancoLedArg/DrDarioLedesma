import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

// Middlewares
import validationHandler from '@/middlewares/validation.handler'

// Utils
import { updatePacienteSchema } from '@/schemas/paciente.schema'

const prisma = new PrismaClient()

async function updateHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const {
      id,
      nombre,
      apellido,
      telefono
    } = req.body

    try {
      const paciente = await prisma.paciente.update({
        where: {
          id: Number(id)
        },
        data: {
          nombre,
          apellido
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

export default validationHandler(updateHandler, updatePacienteSchema, 'body')

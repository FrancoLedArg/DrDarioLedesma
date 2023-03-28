import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

// Middlewares
import validationHandler from '@/middlewares/validation.handler'

// Utils
import { getPacienteSchema } from '@/schemas/paciente.schema'

const prisma = new PrismaClient()

async function handleReadOne(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query

    try {
      const paciente = await prisma.paciente.findUnique({
        where: {
          id: Number(id)
        },
        include: {
          turnos: true
        }
      })

      if(!paciente) {
        return res.status(404).json({ error: `Paciente not found` })
      } else {
        return res.status(200).json({ data: paciente })
      }
    } catch (error) {
      return res.status(400).json({ error: `Bad Request` })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}

export default validationHandler(handleReadOne, getPacienteSchema, 'query')

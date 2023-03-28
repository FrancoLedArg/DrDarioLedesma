import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient} from '@prisma/client'

// Middlewares
import validationHandler from '@/middlewares/validation.handler'

// Utils
import { updateTurnoSchema } from '@/schemas/turno.schema'


const prisma = new PrismaClient()

async function updateHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    const {
      id,
      fecha_y_hora
    } = req.body

    try {
      const turno = await prisma.turno.update({
        where: {
          id: Number(id)
        },
        data: {
          fecha_y_hora
        },
      })
      return res.status(201).json(turno)
    } catch (error) {
      return res.status(404).json({ message: `Turno not found`})
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}

export default validationHandler(updateHandler, updateTurnoSchema, 'body')

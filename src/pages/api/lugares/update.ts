import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient} from '@prisma/client'

// Middlewares
// import validationHandler from '@/middlewares/validation.handler'

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
      ciudad,
      institucion,
      dia,
      comienzo,
      final,
      precio
    } = req.body

    try {
      const lugar = await prisma.lugar.update({
        where: {
          id: Number(id)
        },
        data: {
          ciudad,
          institucion,
          dia,
          comienzo,
          final,
          precio
        },
      })
      return res.status(201).json(lugar)
    } catch (error) {
      return res.status(404).json({ message: `Lugar not found`})
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}

export default updateHandler

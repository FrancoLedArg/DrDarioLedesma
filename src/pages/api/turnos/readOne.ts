import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

// Middlewares
import validationHandler from '@/middlewares/validation.handler'

// Utils
import { getTurnoSchema } from '@/schemas/turno.schema'

const prisma = new PrismaClient()

async function handleReadOne(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query

    try {
      const turno = await prisma.turno.findUnique({
        where: {
          id: Number(id)
        }
      })

      if(!turno) {
        return res.status(404).json({ error: `Turno not found` })
      } else {
        return res.status(200).json({ data: turno })
      }
    } catch (error) {
      return res.status(400).json({ error: `Bad Request` })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}

export default validationHandler(handleReadOne, getTurnoSchema, 'query')

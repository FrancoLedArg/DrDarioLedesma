import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

// Middlewares
import validationHandler from '@/middlewares/validation.handler'

// Utils
import { createLugarSchema } from '@/schemas/lugar.schema'

const prisma = new PrismaClient()

async function createHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { token } = req.cookies
    if(!token) {
      res.status(401).json({ error: 'Unauthorized' })
    }

    const {
      ciudad,
      institucion,
      comienzo,
      final,
      precio
    } = req.body

    try {
      const lugar = await prisma.lugar.create({
        data: {
          ciudad,
          institucion,
          comienzo,
          final,
          precio
        },
      })

      return res.status(201).json(lugar)

    } catch (error) {
      return res.status(404).json({ error: error })
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}

export default validationHandler(createHandler, createLugarSchema, 'body')

import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

// Middlewares
import validationHandler from '@/middlewares/validation.handler'

// Utils
import { getUserSchema } from '@/schemas/user.schema'

const prisma = new PrismaClient()

async function deleteHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { id } = req.query

    try {
      const user = await prisma.user.delete({
        where: {
          id: Number(id)
        },
      })
      return res.status(200).json({ data: user })
    } catch (error) {
      return res.status(404).json({ error: `User not found` })
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

export default validationHandler(deleteHandler, getUserSchema, 'query')

import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'

// Middlewares
import validationHandler from '@/middlewares/validation.handler'

// Utils
import { updateUserSchema } from '@/schemas/user.schema'


const prisma = new PrismaClient()

async function updateHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    const {
      id,
      username,
      password
    } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const user = await prisma.user.update({
        where: {
          id: Number(id)
        },
        data: {
          username,
          password: hashedPassword
        },
      })
      return res.status(201).json(user)
    } catch (error) {
      return res.status(404).json({ message: `User not found`})
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}

export default validationHandler(updateHandler, updateUserSchema, 'body')

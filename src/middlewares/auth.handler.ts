import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

type HandlerFunction = (
  req: NextApiRequest,
  res: NextApiResponse
) => void

export default async function authHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  handler: HandlerFunction
) {
  try {
    const session = await getSession({ req })
    if (!session) {
      throw new Error('Unauthorized')
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.userId
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    return handler(req, res)
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

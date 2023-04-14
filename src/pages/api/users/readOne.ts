import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

async function handleReadOne(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { token } = req.cookies
    if(!token) {
      res.status(401).json({ error: 'Unauthorized' })
    }

    try {
      const payload = jwt.verify(String(token), String(process.env.JWT_SECRET)) as { user: number }
      const user = await prisma.user.findUnique({
        where: {
          id: payload.user
        },
        include: {
          pacientes: true
        }
      })

      if(!user) {
        return res.status(404).json({ error: 'User not found' })
      } else {
        return res.status(200).json({ data: user })
      }
    } catch (error) {
      console.error(error)
      return res.status(400).json({ error: 'Bad Request' })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}

export default handleReadOne

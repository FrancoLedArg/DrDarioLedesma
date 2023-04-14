import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function handleReadMany(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { token } = req.cookies
    if(!token) {
      res.status(401).json({ error: 'Unauthorized' })
    }

    try {
      const lugares = await prisma.lugar.findMany()

      return res.status(200).json({ data: lugares })
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching' })
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}

export default handleReadMany

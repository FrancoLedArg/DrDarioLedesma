import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function handleReadMany(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const turnos = await prisma.turno.findMany()

      return res.status(200).json(turnos)
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching turnos' })
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}

export default handleReadMany

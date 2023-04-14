import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { DateTime } from 'luxon'

const prisma = new PrismaClient()

async function handleReadMany(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    /*
    const { token } = req.cookies
    if(!token) {
      res.status(401).json({ message: 'Unauthorized' })
    }
    */


    const { date } = req.query
    const format = 'yyyy-MM-dd\'T\'HH:mm:ss.sssZZ'

    const startOfDay = DateTime.fromFormat(date, format).startOf('day')
    const endOfDay = DateTime.fromFormat(date, format).endOf('day')

    try {
      const turnos = await prisma.turno.findMany(/*{
        where: {

        }
      }*/)

      return res.status(200).json({ startOfDay, endOfDay })
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching turnos' })
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}

export default handleReadMany

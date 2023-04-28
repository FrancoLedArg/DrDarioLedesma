import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function handleReadByName(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { token } = req.cookies
    if(!token) {
      res.status(401).json({ error: 'Unauthorized' })
    }

    const { nombre, apellido } = req.query

    try {
      const pacientes = await prisma.paciente.findMany({
        where: {
          nombre: nombre ? { equals: String(nombre) } : undefined,
          apellido: apellido ? { equals: String(apellido) } : undefined,
        },
      })

      return res.status(200).json(pacientes)
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching pacientes' })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}

export default handleReadByName

import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

// Middlewares
import validationHandler from '@/middlewares/validation.handler'

// Utils
import { getPacienteSchema } from '@/schemas/paciente.schema'

const prisma = new PrismaClient()

async function deleteHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { id } = req.query

    try {
      const paciente = await prisma.paciente.delete({
        where: {
          id: Number(id)
        },
      })
      return res.status(200).json({ data: paciente })
    } catch (error) {
      return res.status(404).json({ error: `Paciente not found` })
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

export default validationHandler(deleteHandler, getPacienteSchema, 'query')

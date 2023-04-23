import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

// Middlewares
import validationHandler from '@/middlewares/validation.handler'

// Utils
import { createUserSchema } from '@/schemas/user.schema'

const prisma = new PrismaClient()

async function createHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const {
      username,
      email,
      password,
      nombre,
      apellido,
      telefono
    } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)
    try {
      const user= await prisma.$transaction([
        prisma.user.create({
          data: {
            role: 'PACIENTE',
            username,
            email,
            password: hashedPassword,
            pacientes: {
              create: {
                nombre,
                apellido,
                telefono,
              },
            },
          },
          include: {
            pacientes: true,
          },
        }),
      ])

      return res.status(201).json(user)
    } catch (error) {
      return res.status(404).json({ error: 'Hubo un error' })
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}

// export default validationHandler(createHandler, createUserSchema, 'body')

export default createHandler

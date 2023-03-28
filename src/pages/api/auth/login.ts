import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

// Middlewares
import validatorHandler from '@/middlewares/validation.handler'

// Utils
import { logInSchema } from '@/schemas/auth.schema'

const prisma = new PrismaClient()

async function loginHandler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'POST') {
    const {
      username,
      password
    } = req.body

    const user = await prisma.user.findUnique({
      where: {
        username: username
      }
    })

    if(!user) {
      res.status(401).json({ message: 'Usuario o contraseña incorrectos' })
    } else {
      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch) {
        res.status(401).json({ message: 'Usuario o contraseña incorrectos'})
      } else {
        const token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 6,
          user: user.id
        }, String(process.env.JWT_SECRET))

        const serialized = serialize('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 * 6,
          path: '/'
        })

        res.setHeader('Set-Cookie', serialized)
        res.status(200).json({ message: 'Sesion iniciada exitosamente!'})
      }
    }
  }
}

export default validatorHandler(loginHandler, logInSchema, 'body')

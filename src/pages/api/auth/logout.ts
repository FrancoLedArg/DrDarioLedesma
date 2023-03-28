import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

async function logoutHandler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'POST') {
    const { token } = req.cookies

    if(!token) {
      return res.status(401).json({ error: 'No token' })
    } else {
      try {
        jwt.verify(token, String(process.env.JWT_SECRET))

        const serialized = cookie.serialize('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 0,
          path: '/'
        })

        res.setHeader('Set-Cookie', serialized)
        res.status(200).json({message: 'Logged out succesfully'})
      } catch (error) {
        res.status(401).json({ message: 'Invalid token'})
      }
    }
  }
}

export default logoutHandler

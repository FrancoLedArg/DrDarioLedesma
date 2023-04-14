import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

type HandlerFunction = (
  req: NextApiRequest,
  res: NextApiResponse
) => void

export default function authHandler(
  handler: HandlerFunction,
  role: string
) {
  return async (
    req: NextApiRequest,
    res: NextApiResponse
    ) => {

    /* Check if token exists */
    const { token } = req.cookies
    if(!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    /* Check if decoded exists */
    const decoded = jwt.decode(token, { complete: true })
    if(!decoded) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    /* Extract payload */
    const payload = decoded.payload as { role: string }

    /* Check if roles are matching */
    const match = await bcrypt.compare(role, payload.role)
    if(!match) {
      res.status(401).json({ message: 'Unauthorized' })
    }

    console.log(match)
    return handler(req, res)
  }
}

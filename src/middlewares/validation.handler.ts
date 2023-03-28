import { NextApiRequest, NextApiResponse } from 'next'
import Joi from 'joi'

type HandlerFunction = (
  req: NextApiRequest,
  res: NextApiResponse
) => void

export default function validatorHandler(
  handler: HandlerFunction,
  schema: Joi.ObjectSchema,
  property: string
) {
  return (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
      const { error } = schema.validate(req[property], { abortEarly: false })
      if(error) {
        res.status(400).json({ message: 'Invalid data' })
      } else {
        return handler(req, res)
      }
  }
}

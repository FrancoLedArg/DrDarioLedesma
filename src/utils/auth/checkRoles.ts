import jwt from "jsonwebtoken"

export function checkAdmin (token) {
  const decoded = jwt.decode(token, { complete: true })

  const payload = decoded.payload

  console.log(payload)
}

import jwt from 'jsonwebtoken'

export function generateToken(payload: { id: string; role: string }) {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error('JWT_SECRET not defined')
  }

  return jwt.sign(payload, secret, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error('JWT_SECRET not defined')
  }

  return jwt.verify(token, secret) as { id: string; role: string }
}

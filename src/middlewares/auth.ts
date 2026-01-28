import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        role: string
      }
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
    // 1. Pega o token do header
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ error: 'Token not provided' })
    }

    // 2. Remove o "Bearer " do início
    const token = authHeader.replace('Bearer ', '')

    // 3. Verifica o token
    const decoded = verifyToken(token)

    // 4. Adiciona os dados do user no req
    req.user = decoded
    // 5. Chama o próximo middleware/rota
    next()
     } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

import { Request, Response, NextFunction } from 'express'

export function authorize(allowedRoles: string[]) {

    return (req: Request, res: Response, next: NextFunction) => {
        // 1. Verifica se tem usuário no req (se passou pelo authMiddleware)
        
        if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' })
        }

        // 2. Verifica se o role do usuário tá na lista de permitidos
        if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Forbidden' })
        }

        // 3. Tá liberado!
        next()
  }
}



import { Request, Response } from 'express'
import { loginSchema } from '../schemas/auth-schema'
import { login } from '../services/auth-service'


export async function loginController(req: Request, res: Response) {
try {
    // 1. Valida os dados com Zod
    const { email, password } = loginSchema.parse(req.body)

    // 2. Chama o service
    const result = await login(email, password)

    // 3. Retorna sucesso
    return res.status(200).json(result)
  } catch (error: any) {
    // 4. Trata erros
    return res.status(401).json({
      error: error.message || 'Authentication failed'
    })
  }
}

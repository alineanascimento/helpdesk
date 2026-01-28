import { Router, Request, Response } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { authorize } from '../middlewares/authorize'


const router = Router()


router.get('/public', (req: Request, res: Response) => {
  return res.json({ message: 'This is a public route, anyone can access!' })
})


router.get('/protected', authMiddleware, (req: Request, res: Response) => {
  return res.json({
    message: 'This is a protected route!',
    user: req.user
  })
})

router.get('/admin-only', authMiddleware, authorize(['admin']), (req: Request, res: Response) => {
  return res.json({
    message: 'This route is only for admins!',
    user: req.user
  })
})

export default router
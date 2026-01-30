import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { authorize } from '../middlewares/authorize'
import {
  createCustomerController,
  listCustomersController,
  getCustomerController,
  updateCustomerController,
  deleteCustomerController
} from '../controllers/customer-controller'



const router = Router()


// Middleware que transforma /me no ID do usuário logado
function meToUserId(req: any, res: any, next: any) {
  req.params.id = req.user?.id
  next()
}


// 1. Rota pública
router.post('/', createCustomerController)

// 2. Rotas /me (VEM ANTES!)
router.get('/me', authMiddleware, meToUserId, getCustomerController)
router.put('/me', authMiddleware, meToUserId, updateCustomerController)
router.delete('/me', authMiddleware, meToUserId, deleteCustomerController)

// 3. Rotas /:id (VEM DEPOIS!)
router.get('/', authMiddleware, authorize(['admin']), listCustomersController)
router.get('/:id', authMiddleware, authorize(['admin']), getCustomerController)
router.put('/:id', authMiddleware, authorize(['admin']), updateCustomerController)
router.delete('/:id', authMiddleware, authorize(['admin']), deleteCustomerController)

export default router
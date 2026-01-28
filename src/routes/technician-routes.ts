import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { authorize } from '../middlewares/authorize'
import {
  createTechnicianController,
  listTechniciansController,
  getTechnicianController,
  updateTechnicianController
} from '../controllers/technician-controller'

const router = Router()


router.use(authMiddleware)
router.use(authorize(['admin']))

router.post('/', createTechnicianController)
router.get('/', listTechniciansController)
router.get('/:id', getTechnicianController)
router.put('/:id', updateTechnicianController)


export default router

import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { authorize } from '../middlewares/authorize'
import {
  createServiceController,
  listServicesController,
  getServiceController,
  updateServiceController,
  deactivateServiceController
} from '../controllers/service-controller'


const router = Router()


router.use(authMiddleware)
router.use(authorize(['admin']))

router.post('/', createServiceController)
router.get('/', listServicesController)
router.get('/:id', getServiceController)
router.put('/:id', updateServiceController)
router.delete('/:id', deactivateServiceController)


export default router
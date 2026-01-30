import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import authRoutes from './routes/auth-routes'
import testRoutes from './routes/test-routes'
import technicianRoutes from './routes/technician-routes'
import serviceRoutes from './routes/service-routes'
import customerRoutes from './routes/customer-routes'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
// Routes
app.use('/auth', authRoutes)

// Test Routes
app.use('/test', testRoutes)

// Technician Routes
app.use('/technicians', technicianRoutes)

// Service Routes
app.use('/services', serviceRoutes)

// Customer Routes
app.use('/customers', customerRoutes)

// Health Check
app.get('/health', (req, res) => {
  return res.json({ status: 'ok', message: 'Server is running!' })
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`API Docs available at http://localhost:${PORT}/api-docs`)

})
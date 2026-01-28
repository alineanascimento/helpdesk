import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import authRoutes from './routes/auth-routes'
import testRoutes from './routes/test-routes'
import technicianRoutes from './routes/technician-routes'


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


// Health Check
app.get('/health', (req, res) => {
  return res.json({ status: 'ok', message: 'Server is running!' })
})


const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
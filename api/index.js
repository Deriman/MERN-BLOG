import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()
try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connection ok')
} catch (error) {
    console.log(error)
}

const app = express()
app.use(express.json())
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)

app.listen(3000, () => {
    console.log('Server running on port 3000')
})

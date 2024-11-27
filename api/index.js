import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connection ok')
} catch (error) {
    console.log(error)
}

const app = express()

app.listen(6000, () => {
    console.log('Server running on port 6000')
})
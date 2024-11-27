import User from '../models/User.model.js'
import bcrypt from 'bcrypt'

const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    // Validación con express-validator
    // Encriptamos la contraseña con bcrypt -> con mongoose de otra manera
    const passwordHashed = bcrypt.hashSync(password, 10)
    const userToDb = new User({
        username,
        email,
        password: passwordHashed
    })

    try {
        const userCreated = await userToDb.save()
        res.json({ userCreated })
    } catch (error) {
        next(error)
    }
}

export {
    signup
}
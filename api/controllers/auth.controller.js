import { validationError } from '../middlewares/handleErrors.js'
import User from '../models/User.model.js'
import bcrypt, { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    // Validación con express-validator
    // Encriptamos la contraseña con bcrypt -> con mongoose de otra manera
    const passwordHashed = await bcrypt.hash(password, 10)
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

const signin = async (req, res, next) => {
    const { email, password } = req.body
    console.log(req.body)
    // Validación con express-validator

    try {
        const userDB = await User.findOne({ email })
        if (!userDB) return next(validationError(404, "No existe usuario registrado con ese email"))
        const validPassword = await compare(password, userDB.password)
        if (!validPassword) return next(validationError(400, "Contraseña incorrecta"))
        const token = jwt.sign({ uid: userDB._id }, process.env.JWT_SECRET, { expiresIn: 60 * 30 })
        const { password: pass, ...rest } = userDB._doc
        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest)

    } catch (error) {
        next(error)
    }
}

const google = async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body
    try {
        const userDB = await User.findOne({ email })
        if (userDB) {
            const token = jwt.sign({ uid: userDB._id }, process.env.JWT_SECRET, { expiresIn: 60 * 30 })
            const { password: pass, ...rest } = userDB._doc
            res.status(200).cookie('access_token', token, {
                httpOnly: true
            }).json(rest)
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = await bcrypt.hash(generatedPassword, 10)
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl
            })
            const userCreate = await newUser.save()
            const token = jwt.sign({ uid: userCreate._id }, process.env.JWT_SECRET, { expiresIn: 60 * 30 })
            const { password, ...rest } = userCreate
            res.status(200).cookie('access_token', token, {
                httpOnly: true
            }).json(rest)

        }
    } catch (error) {
        next(error)
    }

}

export {
    signup,
    signin,
    google
}
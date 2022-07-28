import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import mongoose from 'mongoose'
import { User } from './../models/users'

const router = express.Router()

mongoose.connect(
    'mongodb+srv://luis-neuron:hwAn43kWNJIVf9iG@cluster0.oy2dl.mongodb.net/?retryWrites=true&w=majority',
    {},
    () => {
        console.log('connected to database')
    }
)

router.post(
    '/register/',
    body('email').isEmail().normalizeEmail(),
    //body('phone').isMobilePhone("es-MX"),
    //body('password').isLength({
    //    max: 64,
    //    min: 8,
    //}),
    (req: Request, res: Response) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            })
        }
        console.log(req.body)
        User.findOne({ email: req.body.email }, function (err: any, user: any) {
            if (err) {
                console.log('err: ', err)
                return res.status(400).json({
                    success: false,
                    errors: err,
                })
            }
            console.log(user);
            if (user != null) {
                return res.status(400).json({
                    success: false,
                    errors: ['user already exists', user.email],
                })
            } else {
                const newUser = new User({
                    email: req.body.email,
                    name: req.body.name,
                    phone: req.body.phone,
                    password: req.body.password,
                })
                // TODO Review unique entry in database
                newUser.save()
                res.status(200).send(newUser)
            }
        })

        
    }
)

router.post('/login', (req: Request, res: Response) => {
    User.findOne({ email: req.body.email }, function (err: any, user: any) {
        if (err) {
            return res.status(400).json({
                success: false,
                errors: err,
            })
        }
        if (user == null) {
            return res.status(400).json({
                success: false,
                errors: 'user not found',
            })
        } else {
            if (user.password == req.body.password) {
                return res.status(200).send(user)
            } else {
                return res.status(400).json({
                    success: false,
                    errors: 'wrong password',
                })
            }
        }
    })
})

export { router as UserRouter }

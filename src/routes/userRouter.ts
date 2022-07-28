import express, {Request, Response} from 'express';
import { body, validationResult } from "express-validator";
import mongoose from 'mongoose';
import { User } from 'src/models/users';

const router = express.Router();

mongoose.connect('mongodb+srv://luis-neuron:hwAn43kWNJIVf9iG@cluster0.oy2dl.mongodb.net/?retryWrites=true&w=majority', {}, () => {
    console.log('connected to database');
})

router.post( "/register/",
body('email').isEmail().normalizeEmail(),
body('phone').isMobilePhone("es-MX"),
body('password').isLength({
    max: 64,
    min: 8,
}),
( req: Request, res: Response ) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    console.log(req.body);
    const newUser = User({
        'email': body('email'),
        'name': body('name')
    })
    // TODO Add mongo db store logic
    res.send( "Registering!!" );
} );


router.get( "/login", ( req: Request, res: Response ) => {
    res.send( "Logging in" );
} );

export { router as UserRouter }
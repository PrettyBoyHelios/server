import express from 'express';
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post( "/register/",
body('email').isEmail().normalizeEmail(),
body('phone').isMobilePhone("es-MX"),
body('password').isLength({
    max: 64,
    min: 8,
}),
( req: any, res: any ) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    console.log(req.body);
    // TODO Add mongo db store logic
    res.send( "Registering!!" );
} );


router.get( "/login", ( req: any, res: any ) => {
    res.send( "Logging in" );
} );

export { router as UserRouter }
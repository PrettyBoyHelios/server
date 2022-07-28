import express from "express";
import bodyParser from "body-parser";
import { body, validationResult } from "express-validator";

const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// define a route handler for the default home page
app.get( "/", ( req: any, res: any ) => {
    res.send( "Hello world!" );
} );


app.post( "/register/",
body('email').isEmail().normalizeEmail(),
body('phone').isMobilePhone("es-MX"),
body('password').isLength({
    max: 64,
    min: 8,
}),
( req: any, res: any ) => {
    const errors = validationResult(req);
    console.log("validation errors: ", errors);
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


app.get( "/login", ( req: any, res: any ) => {
    res.send( "Logging in" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
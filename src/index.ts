import express from "express";

const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req: any, res: any ) => {
    res.send( "Hello world!" );
} );


app.post( "/register/", ( req: any, res: any ) => {
    res.send( "Registering" );
} );


app.get( "/login", ( req: any, res: any ) => {
    res.send( "Logging in" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
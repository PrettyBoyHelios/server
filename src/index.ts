import express from 'express'
import bodyParser from 'body-parser'
import { UserRouter } from './routes/userRouter'
import cors from 'cors'

const allowedOrigins = ['http://localhost:3000']; // required to run locallyboth the server and the app

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

const app = express()
const port = 8080 // default port to listen

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(options))

// define a route handler for the default home page
app.get('/', (req: any, res: any) => {
    res.send('Hello world!')
})

app.use(UserRouter)

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})

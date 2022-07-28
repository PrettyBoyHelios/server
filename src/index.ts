import express from 'express'
import bodyParser from 'body-parser'
import { UserRouter } from './routes/userRouter'

const app = express()
const port = 8080 // default port to listen

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// define a route handler for the default home page
app.get('/', (req: any, res: any) => {
    res.send('Hello world!')
})

app.use(UserRouter)

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})

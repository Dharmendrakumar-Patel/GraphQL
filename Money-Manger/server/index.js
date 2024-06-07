import express from 'express'
import dotenv from 'dotenv'
import { ApolloServer } from '@apollo/server'
dotenv.config()

const port = process.env.PORT || 3000

const app = express()

express.json()

app.get('/', (req,res) => {
    res.send('Welcome To Money Manager Backend')
})

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})
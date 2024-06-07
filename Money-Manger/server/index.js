import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from "@apollo/server/express4"
import typeDefs from "./typeDef/index.js"
import resolvers from "./resolver/index.js"
import connectDB from './database/db.js';
dotenv.config()

const port = process.env.PORT || 3000

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

await server.start();

const app = express()

app.use(express.json())
app.use(cors())
app.use('/graphql', expressMiddleware(server));

app.get('/', (req,res) => {
    res.send('Welcome To Money Manager Backend')
})

connectDB()

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})
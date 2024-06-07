import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from "@apollo/server/express4"
import typeDefs from "./typeDef/index.js"
import resolvers from "./resolver/index.js"
import connectDB from './database/db.js'
import configurePassport from './passport/passport.js'
dotenv.config()
configurePassport()

import passport from 'passport'
import session from 'express-session'
import connectMongo from 'connect-mongodb-session'
import { buildContext } from "graphql-passport";

const port = process.env.PORT || 3000

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

await server.start();

const app = express()

const mongoDBStore = connectMongo(session)

const store = new mongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "sessions"
})

store.on("error", (err) => console.log(err))

app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URI,
    credentials: true
}))
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true
        },
        store: store
    })
)
app.use(passport.initialize())
app.use(passport.session())
app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => buildContext({ req })
}));

app.get('/', (req,res) => {
    res.send('Welcome To Money Manager Backend')
})

connectDB()

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})
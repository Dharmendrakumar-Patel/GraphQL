import passport from "passport";
import bcrypt from "bcryptjs"
import User from "../model/user.js"
import { GraphQLLocalStrategy } from "graphql-passport";

const configurePassport = async () => {
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id)
            done(null, user)
        } catch (err) {
            done(err)
        }
    })

    passport.use(new GraphQLLocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username })

            if(!user) throw new Error("Invalid password or username")

            const validPassword = await bcrypt.compare(password, user.password)

            if(!validPassword) throw new Error("Invalid password or username")

            return done(null, user)
        } catch (err) {
            done(err)
        }
    }))
}

export default configurePassport
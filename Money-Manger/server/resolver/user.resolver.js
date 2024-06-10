import { users } from "../constant/data.js"
import User from "../model/user.js"
import bcrypt from "bcryptjs"

const userResolver = {
    Mutation: {
        signUp: async (_, {input}, context) => {
            try {
                const {username, name, password, gender} = input

                const oldUser = await User.findOne({username})

                if(oldUser) throw new Error("User Already Exits.")

                const genSalt = await bcrypt.genSalt(10)
                const encryptedPassword = await bcrypt.hash(password, genSalt)

                const boyPicture = `https://avatar.iran.liara.run/public/boy?username=${username}`
                const girlPicture = `https://avatar.iran.liara.run/public/girl?username=${username}`

                const user = await User.create({
                    username,
                    name,
                    password: encryptedPassword,
                    gender,
                    profilePicture: gender !== "male" ? girlPicture : boyPicture
                })

                await context.login(user)

                return user
            } catch (err) {
                console.log("signup err", err)
                throw new Error(err.message || "Internal Server Error")
            }
        },
        login: async (_, {input}, context) => {
            try {
                const {username, password} = input

                const { user } = await context.authenticate("graphql-local", {username, password})

                await context.login(user)

                return user
            } catch (err) {
                console.log("login err", err)
                throw new Error(err.message || "Internal Server Error")
            }
        },
        logout: async (_,__,context) => {
            try {
                await context.logout()
                req.session.destroy((err) => {if(err) throw new Error(err)})
                res.clearCookie("connect:sid")
                return { message: "Logged Out Successfully" }
            } catch (err) {
                console.log("logout err", err)
                throw new Error(err.message || "Internal Server Error")
            }
        }
    },
    Query: {
        users: async () => {
            try {
                return await User.find()
            } catch (err) {
                console.log("users", err)
                throw new Error(err.message || "Internal Server Error")
            }
        },
        user: async (_, {userId}) => {
            try {
                return await User.findById(userId)
            } catch (err) {
                console.log("user", err)
                throw new Error(err.message || "Internal Server Error")
            }
        },
        authUser: async (_, __, context) => {
            try {
                const user = await context.getUser()

                return user
            } catch (err) {
                console.log("authUser", err)
                throw new Error(err.message || "Internal Server Error")
            }
        } 
    }
}

export default userResolver
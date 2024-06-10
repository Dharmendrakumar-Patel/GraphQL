import { transactions } from "../constant/data.js"
import Transaction from "../model/transaction.js"

const transactionResolver = {
    Mutation: {
        createTransaction: async (_, {input}, context) => {
            try {
                const {description, paymentType, category, amount, location} = input

                const user = await context.getUser()

                if(!user) throw new Error("You Are Not Authenticated.")

                const transaction = await Transaction.create({
                    userId: user._id,
                    description,
                    paymentType,
                    category,
                    amount,
                    location
                })

                return transaction
            } catch (err) {
                console.log("createTransaction err", err)
                throw new Error(err.message || "Internal Server Error")
            }
        },
        updateTransaction: async (_, {input}) => {
            try {
                const {transactionId, ...rest} = input

                const transaction = await Transaction.findByIdAndUpdate({_id: transactionId}, rest)

                return transaction
            } catch (err) {
                console.log("updateTransaction err", err)
                throw new Error(err.message || "Internal Server Error")
            }
        },
        deleteTransaction: async (_, {transactionId}) => {
            try {
                const deletedTransaction = await Transaction.findByIdAndDelete({_id: transactionId})
                return deletedTransaction
            } catch (err) {
                console.log("updateTransaction err", err)
                throw new Error(err.message || "Internal Server Error")
            }
        },
    },
    Query: {
        transactions: async (_, __, context) => {
            try {
                return await Transaction.find()
            } catch (err) {
                console.log("transactions err", err)
                throw new Error(err.message || "Internal Server Error")
            }
        },
        transaction: async (_, {transactionId}) => {
            try {
                const transaction = await Transaction.findById(transactionId)
                return transaction
            } catch (err) {
                console.log("transaction err", err)
                throw new Error(err.message || "Internal Server Error")
            }
        }, 
    }
}

export default transactionResolver
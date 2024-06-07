import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, "provide an userId"]
    },
    description : {
        type: String,
        require: [true, "provide a description."],
    },
    paymentType : {
        type: String,
        enum: ["cash", "debit card", "credit card", "net banking", "mobile banking", "upi"],
        require: true
    },
    category : {
        type: String,
        require: true
    },
    amount : {
        type: Number,
        require: true,
        default: 0
    },
    location: {
        location: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    }
}, { timestamps: true })

const Transaction = new mongoose.model("Transaction", transactionSchema)

export default Transaction
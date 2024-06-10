import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please provide a userId"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description."]
    },
    paymentType: {
        type: String,
        required: [true, "Please provide a Payment Type."]
    },
    category: {
        type: String,
        required: [true, "Please provide a category."]
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    location: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;

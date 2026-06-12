const mongoose = require("mongoose");
const constant = require("../utils/constant");

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true

    },
    ticketPriority: {
        type: String,
        required: true,
        default: 4

    },
    description: {
        type: String,
        required: true

    },
    reporter: {
        type: String,
        required: true

    },
    status: {
        type: String,
        required: true,
        default: constant.ticketStatus.open
    },
    assignee: {
        type: String,

    }


}, { timestamps: true }
)

module.exports = mongoose.model("Ticket", ticketSchema);
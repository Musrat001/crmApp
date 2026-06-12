const Ticket = require("../models/tickets.models.js");

const validateCommentRequestBody = async (req, res, next) => {

    if (!req.params.ticketId) {
        return res.status(400).send({
            message: "Please provide ticketId"
        });
    }

    // checking provided ticket is valid
    const ticket = await Ticket.findOne({
        _id: req.params.ticketId
    }); 

    if (!ticket) {
        return res.status(400).send({
            message: "Invalid Ticket id"
        });
    }

    if (!req.body.content) {
        return res.status(400).send({
            message: "Content field can't be Empty"
        })
    }

    next();


}

module.exports = {
    validateCommentRequestBody: validateCommentRequestBody
}
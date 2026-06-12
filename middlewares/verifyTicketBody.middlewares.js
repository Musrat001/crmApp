const constant = require("../utils/constant");


const verifyTicketBody = (req, res, next) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Title is required"
        })
    }
    if (!req.body.description) {
        res.status(400).send({
            message: "description is required"
        })
    }
    next();
}



const validateTicketStatus = (req, res, next) => {
    const ticketStatus = req.body.ticketStatus;

    const ticketStatuses = [constant.ticketStatus.blocked, constant.ticketStatus.closed, constant.ticketStatus.open];

    if (ticketStatus && !ticketStatuses.includes(ticketStatus)) {
        return res.status(402).send({
            message: "Provided status is not valid!"
        })
    }
    next();
}

module.exports = {
    verifyTicketBody: verifyTicketBody,
    validateTicketStatus: validateTicketStatus
    
}
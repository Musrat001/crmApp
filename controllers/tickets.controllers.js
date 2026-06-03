const User = require("./models/user.models.js");
const constant = require("../utils/constant.js");
const Ticket = require("../models/ticket.models.js");




exports.createTicket = (req, res) => {
    // step 1: Ticket creation
    const ticketObj = {
        title: req.body.title,
        titlePriority: req.body.titlePriority,
        description: req.body.description,
        status: req.body.status,
        reporter: req.userId
    }

    // finding engineer to assign him to as assignee

    const engineer = await User.findOne({
        userType: constant.userTypes.engineer,
        userStatus: constant.userStatus.approved
    })

    if (engineer) {
        ticketObj.assignee = engineer.userId;
    }

    // creating the ticket inside the db

    try {


        const ticket = await Ticket.create(ticketObj);
        if (ticket) {
            return res.status(201).send({
                message: "Ticket is created successfully!"
            })
        } return;

    } catch (error) {
        console.log("Error while creating the ticket,", error);
        res.status(500).send({
            message: "Error while creating ticket"
        })

    }
}
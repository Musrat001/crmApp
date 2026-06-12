const User = require("../models/user.models.js");
const constant = require("../utils/constant.js");
const Ticket = require("../models/tickets.models.js");




exports.createTicket = async (req, res) => {
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
            return res.status(201).send(ticket);
        } return;

    } catch (error) {
        console.log("Error while creating the ticket,", error);
        res.status(500).send({
            message: "Error while creating ticket"
        })

    }
}



// logic for updating ticket detail, and that is done by only three person, ticket filer, engineer, admin

exports.updateTicket = async (req, res) => {

    const ticket = await Ticket.findOne({ _id: req.params.id });

    const callingUser = await User.findOne({ userId: req.userId });


    if (ticket.reporter == req.userId || callingUser.userType == constant.userTypes.engineer || callingUser.userType == constant.userTypes.admin) {

        ticket.title = req.body.title != undefined ? req.body.title : ticket.title,
            ticket.ticketPriority = req.body.ticketPriority != undefined ? req.body.ticketPriority : ticket.ticketPriority,
            ticket.description = req.body.description != undefined ? req.body.description : ticket.description,
            ticket.status = req.body.status != undefined ? req.body.status : ticket.status,
            ticket.assignee = req.body.assignee != undefined ? req.body.assignee : ticket.assignee

        const updatedTicket = await ticket.save();
        res.status(200).send(updatedTicket);



    } else {
        res.status(402).send({
            message: "Ticket can only be updated by Engineer, Or Admi, Or Ticket filer"
        })
    }

}


exports.getAllTickets = async (req, res) => {
    const ticketObj = {};

    const savedUser = await User.findOne({
        userId: req.userId
    });

    if (savedUser.userType == constant.userTypes.customer) {
        ticketObj.reporter = savedUser.userId;
    }
    if (savedUser.userType == constant.userTypes.engineer) {
        ticketObj.assignee = savedUser.userId;
    }

    const ticket = await Ticket.find(ticketObj);

    res.status(201).send(ticket);
}


exports.getTicketById = async (req, res) => {
    const ticket = await Ticket.findOne({
        _id: req.params.id
    })

    const savedUser = await User.find({
        userId: req.userId
    })

    if (savedUser.userType == constant.userTypes.admin || ticket.reporter == req.userId || ticket.assignee == req.userId) {
        return res.status(200).send(ticket);
    }
    return res.status(400).send({
        message: "cannot return ticket as you are not authorized"
    })


}
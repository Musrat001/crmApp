const express = require("express");
const router = express.Router();
const authMW = require("../middlewares/authjwt.middlewares.js");
const verifyTicketBody = require("../middlewares/verifyTicketBody.middlewares.js")
const verifyCommentBody = require("../middlewares/verifyCommentReqBody.middlewares.js")
const ticketsController = require("../controllers/tickets.controllers.js");
const commentController = require("../controllers/comments.controlles.js")

router.post("/tickets", [authMW.verifyToken, verifyTicketBody.verifyTicketBody], ticketsController.createTicket);
router.put("/tickets/:id", [authMW.verifyToken, verifyTicketBody.validateTicketStatus], ticketsController.updateTicket);
router.get("/tickets", [authMW.verifyToken], ticketsController.getAllTickets);
router.get("/tickets/:id", [authMW.verifyToken], ticketsController.getTicketById);
router.post("/tickets/:ticketId/comments", [authMW.verifyToken, verifyCommentBody.validateCommentRequestBody], commentController.createComment);










module.exports = router;
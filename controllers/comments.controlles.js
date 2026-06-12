
const Comment = require("../models/comments.models.js");


exports.createComment = async (req, res)=>{
    const commentObject = {
        content: req.body.content,
        ticketId: req.params.ticketId,
        commenterId: req.userId
    }

    try {

        const comment = await Comment.create(commentObject);
        return res.status(201).send(comment);
        
    } catch (error) {
        console.log("Error while creating comment");
        return res.status(400).send({
            message: "error while creating comment"
        })
        
    }
}
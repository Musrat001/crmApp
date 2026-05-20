const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user.models.js");
const bcrypt = require("bcryptjs");

// connecting mongoose and express


(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongodb connected successfully..");
        const user = await User.findOne({ userType: "ADMIN" });
        // console.log(user);


        if (!user) {
            console.log("ADMIN not found..");
            const admin = await User.create({
                name: "MUSRAT",
                userId: "Musrat001",
                userType: "ADMIN",
                email: "Musrat@gmail.com",
                password: bcrypt.hashSync("Musrat01", 10)
            });
            // console.log("ADMIN is created: ", admin);

        }
        else {
            console.log("ADMIN Already Exits");

        }

    } catch (error) {
        console.log(error);

    }
})
    ();

const auth_routes = require("./routes/auth.routes.js");
app.use(express.json());
// app.get("/test", (req, res) => {
//     console.log("Test route hit");
//     res.send("Working");
// });

app.use("/crm/api/v1", auth_routes);
app.listen(process.env.PORT || 27017, () => {
    console.log(`Server has started running on ${process.env.PORT}`);

})
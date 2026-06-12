const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user.models.js");
const bcrypt = require("bcryptjs");
const cors = require("cors");
app.use(express.json());
app.use(cors());


const auth_routes = require("./routes/auth.routes.js");
app.use("/crm/api/v1", auth_routes);


const user_routes = require("./routes/users.routes.js")
app.use("/crm/api/v1", user_routes)

const tickets_routes = require("./routes/tickets.routes.js");

app.use("/crm/api/v1", tickets_routes);
mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {

        console.log("MongoDB connected successfully");

        const user = await User.findOne({ userType: "ADMIN" });

        if (!user) {

            console.log("ADMIN not found");

            await User.create({
                name: "MUSRAT",
                userId: "Musrat001",
                userType: "ADMIN",
                email: "Musrat@gmail.com",
                password: bcrypt.hashSync("Musrat01", 10)
            });

            console.log("ADMIN created");

        } else {

            console.log("ADMIN already exists");

        }

        app.listen(process.env.PORT || 8080, () => {
            console.log(`Server running on ${process.env.PORT}`);
        });

    })
    .catch((err) => {
        console.log("MongoDB Error:");
        console.log(err);
    });
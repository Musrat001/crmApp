const { userStatus } = require("./constant");

exports.objectResponse = (users) =>{

    const userObject = [];

    users.forEach(users => {
        userObject.push({
            name: users.name,
            userId: users.userId,
            email: users.email,
            userType: users.userType,
            userStatus: users.userStatus
        })
    });

    return userObject;
}
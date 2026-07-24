const userModel = require("../models/user.model");

module.exports.createUser = async ({
    email,
    password,
    firstName,
    lastName,
}) => {

    if (!email || !password || !firstName) {
        throw new Error("Email, password, and first name are required");
    }

    const user = await userModel.create({
        fullName: {
            firstName,
            lastName,
        },
        email,
        password,
    });

    return user;
};
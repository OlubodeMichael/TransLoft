const User = require("./../models/user")
const catchAsync = require("./../utils/catchAsync")

exports.getAllUsers = (catchAsync(async (req, res) => {
    const users = await User.find();
    res.status(200).json({
        status: "sucess",
        data: {
            users
        }
    })
}))

exports.createUser =((req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined"
    })
})

exports.getUser = ((req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined"
    })
})

exports.updateUser = ((req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined"
    })
})

exports.deleteUser = ((req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined"
    })
})
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

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
  };

exports.createUser =((req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined"
    })
})

exports.getUser = catchAsync(async (req, res, next) => {
    let query = User.findById(req.params.id)
    //if(popOptions) query = query.populate(popOptions)
    const doc = await query

    if(!doc) {
        return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
    status: "success",
    data: {
        doc
    }
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
const User = require("./../models/user")
const catchAsync = require("./../utils/catchAsync")

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el];
    })
    return newObj;
}
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
        message: "This route is not yet defined!  Please use /signup instead"
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
exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for password updates. Please use /updateMyPassword', 400));
    }

    const filteredBody = filterObj(req.body, 'name', 'email', 'phone', 'companyName');
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {new: true, runValidators: true});

    res.status(200).json({
        status: "success",
        data: {
            user: updatedUser
        }
    })
});

exports.updateUser = catchAsync(async (req, res, next) => {
    const { password, passwordConfirm, ...updates } = req.body;

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser
      }
    });
})

exports.deleteUser = ((req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined"
    })
})
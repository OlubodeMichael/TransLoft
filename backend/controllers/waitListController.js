const EmailWaitList = require("./../models/waitList")
const catchAsync = require("./../utils/catchAsync")


exports.addToWaitList = catchAsync(async(req, res, next) => {
    const waitList = await EmailWaitList.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            data: waitList
        }
    })
})
const EmailWaitList = require("./../models/waitList")
const catchAsync = require("./../utils/catchAsync")


exports.addToWaitList = catchAsync(async(req, res, next) => {
    const { email } = req.body;
    try {
        await EmailWaitlist.create({ email });
        res.status(200).json({ message: "Successfully added to waitlist" });
      } catch (err) {
        if (err.code === 11000) {
          return res.status(409).json({ message: "Email already exists in waitlist" }); // 409 Conflict
        }
      }
    res.status(201).json({
        status: 'success',
        data: {
            data: email
        }
    })
})
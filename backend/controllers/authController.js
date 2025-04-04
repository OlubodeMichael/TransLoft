const jwt = require('jsonwebtoken')
const { promisify } = require('util');
const User = require('./../models/user');
const catchAsync = require("./../utils/catchAsync");
const AppError = require('../utils/appError');

const signToken = user => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.signUp = catchAsync(async (req, res) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })
    
    const token = signToken(newUser)
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax' // or 'None' if cross-site in production
      });
    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })

})

exports.login = catchAsync(async (req, res) => {
    const {email, password} = req.body

    // 1) Check if email and password exists
    if (!email || !password) {
        return next(new AppError('Provide email and password', 400));
    }
    
    // 2) Check if user exists and password is correct
    const user = await User.findOne({email}).select('+password')
    

    if (!user || (!await user.correctPassword(password, user.password))) {
        return  next(new AppError('Incorrect email or password', 401));
    }
    // 3) Check if everything is ok, send token to client
    const token = signToken(user)

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax' // or 'None' if cross-site in production
      });
      
    res.status(201).json({
        status: 'success',
        role: user.role,
        token
    })
})

exports.protect = catchAsync(async(req, res, next) => {
    let token;
    // 1) Getting token and check of it's there
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      } else if (req.cookies.jwt) {
        token = req.cookies.jwt; // ✅ Pull from cookies
      }

    if(!token) {
        return next(new AppError('You are not logged in. Please login to get access.', 401));
    }
    //2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    //3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if(!currentUser) {
        return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }
    //4) Check if user changed password after the token was issued
    if(currentUser.changePasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed password! Please login again.', 401));
    }

    req.user = currentUser;
    next()
})


exports.restrictedTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next()
    }
    
}

exports.logout = (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      expires: new Date(0) // 👈 Expire the cookie immediately
    });
  
    res.status(200).json({ status: 'success', message: 'Logged out successfully' });
  };
  
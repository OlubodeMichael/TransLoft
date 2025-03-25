const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const shipmentRoute = require("./route/shipmentRoute")
const userRoute = require("./route/userRoute")
const waitListRoute = require("./route/waitListRoute")
const AppError = require("./utils/appError")
const globalErrorHandler= require('./controllers/errorController');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // your frontend origin
    //origin: 'https://trans-loft.vercel.app',
    credentials: true               // 🔥 allow cookies to be sent
}));  
app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser());



app.use('/api/shipments', shipmentRoute);
app.use('/api/users', userRoute);
app.use("/api/wait-list", waitListRoute)
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
})
app.use(globalErrorHandler)
module.exports = app;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const shipmentRoute = require("./route/shipmentRoute")
const userRoute = require("./route/userRoute")
const AppError = require("./utils/appError")
const globalErrorHandler= require('./controllers/errorController');

const app = express();

app.use(cors());
app.use(morgan('dev'))
app.use(express.json());



app.use('/api/shipments', shipmentRoute);
app.use('/api/users', userRoute);
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
})
app.use(globalErrorHandler)
module.exports = app;
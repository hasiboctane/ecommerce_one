import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'

import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import router from './routes/apiRoutes.js';
import errorhandler from './helpers/errorHandler.js';
import responseErrorMessage from './helpers/responseErrorMessage.js';

dotenv.config();
const app = express();

// middlewares
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// route
app.use('/api', router);

// error handler

app.use(errorhandler);

// server and database connection
const port = process.env.PORT || 8000;
const dbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/'
app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
    connectDB(dbUrl)
});

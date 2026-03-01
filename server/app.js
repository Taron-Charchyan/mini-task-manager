const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const cors = require('cors');
const startDB = require('./config/db');
const initSocket = require('./config/socket');
require('dotenv').config();

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const taskRouter = require('./routes/tasks');
const chatRouter = require('./routes/chat');

const app = express();
const server = http.createServer(app);

startDB();
initSocket(server);

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/chat', chatRouter);

app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = { app, server };

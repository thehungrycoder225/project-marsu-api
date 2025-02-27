require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const collegeRouter = require('./routes/collegeRouter');
const facultyRouter = require('./routes/facultyRouter');
const userRouter = require('./routes/userRouter');
const connectDB = require('./config/db');

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/colleges', collegeRouter);
app.use('/api/v1/faculties', facultyRouter);
app.use('/api/v1/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

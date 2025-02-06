const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;
const collegeRouter = require('./routes/collegeRouter');
const facultyRouter = require('./routes/facultyRouter');
const programRouter = require('./routes/programRouter');

app.use(express.json());
const uri =
  'mongodb+srv://govillidane:it6Gbh13gko9ZF10@cluster0.76wqc.mongodb.net/project-marsu-db';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/v1/colleges', collegeRouter);
app.use('/api/v1/faculties', facultyRouter);
app.use('/api/v1/programs', programRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

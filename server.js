const express = require('express');
const cors = require('cors');
const connectDB = require('./config');
const wakeUpDyno = require('./functions/wakeUpDyno');

const app = express();

const PORT = process.env.PORT || 8000;

// Init Middleware
app.use(express.json({ extended: false }));

// Connect MongoDB
connectDB();

app.use(cors());

// Define Routes
app.use('/api', require('./routes/api/experience'));
app.use('/api', require('./routes/api/project'));
app.use('/api', require('./routes/api/tag'));
app.use('/api', require('./routes/api/profile'));

if (process.env.NODE_ENV === 'development') {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

if (process.env.NODE_ENV === 'production') {
  app.listen(PORT, () => {
    wakeUpDyno('https://api.luansportfolio.com/');
    wakeUpDyno('https://www.luansportfolio.com/');
  });
}

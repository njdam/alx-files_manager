import express from 'express';
import indexRouter from './routes/index.js';

const app = express();
const port = process.env.PORT || 5000;

// Load routes
app.use('/', indexRouter);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

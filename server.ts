import express from 'express';
import mongoose from 'mongoose';
import swaggerJSDOC from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { PORT, MONGODB_URI } from './const/config';
import { swaggerOptions } from './swaggerOptions';
// Routes imports
import authRouter from './router/auth';

const app = express();
const specs = swaggerJSDOC(swaggerOptions);

// Routes
app.use('/auth', authRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Connect to MongoDB and log message if successful
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

// App listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
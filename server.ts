import express, { Request, Response } from 'express';
import swaggerJSDOC from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { PORT } from './const/config';
import { swaggerOptions } from './swaggerOptions';
// Routes imports
import authRouter from './router/auth';

const app = express();
const specs = swaggerJSDOC(swaggerOptions);

// Routes
app.use('/auth', authRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
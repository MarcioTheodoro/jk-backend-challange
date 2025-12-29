import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerConfig } from './config/swagger';
import { errorMiddleware } from './middlewares/ErrorMiddleware';
import userRoutes from './routes/user.routes';
import { AppDataSource } from './database/data-source';

const app = express();
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API',
      version: '1.0.0',
      description: 'Documentação da API de usuários em contexto bancário'
    },
    servers: [
      {
        url: 'http://localhost:3000/swagger',
      },
    ],
  },
  apis: ['./src/controllers/*.ts', './src/routes/*.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(cors());
app.use(express.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use('/users', userRoutes);
app.use(errorMiddleware);

app.get('/swagger', (req, res) => {
  return res.json({ message: 'API is running' });
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000/swagger');
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

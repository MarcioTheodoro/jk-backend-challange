import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerConfig } from './config/swagger';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.get('/swagger', (req, res) => {
  return res.json({ message: 'API is running' });
});

app.listen(3000, () => {
  console.log('Server running on port http://localhost:3000/swagger');
});

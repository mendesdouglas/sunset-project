import express from 'express';
import bodyParser from 'body-parser';
import clientRoutes from './routes/clientRoutes';
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');



const app = express();

const options = {
    swaggerDefinition: {
      info: {
        title: 'SUNSET API',
        version: '1.0.0',
        description: 'Documentação da API',
      },
      host: 'http://172.18.185.228:3000',
      basePath: '/',
    },
    apis: ['./routes/*.js'], // Caminho para os arquivos que contêm anotações JSDoc
  };
  
  const specs = swaggerJsdoc(options);
  
  // Rota para servir a documentação Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors({
  origin: 'http://localhost:3001', 
}));
app.use(bodyParser.json());
app.use('/api', clientRoutes);

export default app;




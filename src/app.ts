import express from 'express';
import bodyParser from 'body-parser';
import clientRoutes from './routes/clientRoutes';



const app = express();
console.log('teste')
app.use (bodyParser.json());
app.use('/api', clientRoutes);

export default app;




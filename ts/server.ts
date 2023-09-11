import express from 'express';
import cors from 'cors';
import logger from './loggers/morgan-logger.js';
import initialData from './initial-data/initial-data.js';
import router from './routes/router.js';
import handleServerError from './error-handling/server-error.js';

const PORT = 3000;

const app = express();

app.use(cors());
app.use(logger);
app.use(express.json());
app.use(router);
app.use(handleServerError);

app.listen(PORT, () => {
    console.log('The server is running');
    initialData();
});
import { env, port, apiRoot } from './config';
import express from 'express';
import api from './api';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { errorHandler as queryErrorHandler } from 'querymen';
import { errorHandler as bodyErrorHandler } from 'bodymen';

const app = express();

/* istanbul ignore next */
if (env === 'production' || env === 'development') {
  app.use(cors());
  app.use(compression());
  app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(apiRoot, api);
app.use(queryErrorHandler());
app.use(bodyErrorHandler());





app.listen(5200, () => {
  console.log('Express server listening on http://%s:%s, in %s mode', port, env);
});

export default app;

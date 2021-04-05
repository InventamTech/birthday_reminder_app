import app from './src';
import logger from './src/logger';

const awsServerlessExpress = require('aws-serverless-express');

const server = awsServerlessExpress.createServer(app, () => {
  logger.info('voice app started..');
});

exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};

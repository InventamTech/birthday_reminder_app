/**
 * @author Pritesh Bhanderi
 * @description Server and REST API config
 */
import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import multer from 'multer';
import logger from './logger';
import { authorizeUser } from './middleware';
require('./database/model/index')
require('./database/model/friend')
import {
	authHandler,
	addFriendHandler,
	getFriendHandler,
	deleteFriendHandler,
	editFriendHandler,
	uploadCSVHandler
} from './routes';
// import fileupload from 'express-fileupload'
// import multer from 'multer';
const app = express();

let server = new http.Server(app);
/**
 * Handle connection to socket.io.
 */

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
	try {
		const xForwardedFor = ((req.headers['x-forwarded-for'] || '') as string).replace(/:\d+$/, '');
		const ip = xForwardedFor || req.connection.remoteAddress;
		logger.info(
			`IMP - API called path: ${req.path} method: ${req.method}, query: ${JSON.stringify(
				req.query,
			)}, remote address (main/proxy ip):${ip}, reference: ${req.headers.referer} and user-agent: ${req.headers['user-agent']
			}`,
		);
	} catch (error) {
		logger.error(`error while printing caller info path: ${req.path}`);
	}

	next();
});

const internalRouters = express.Router();
internalRouters.post('/login', authHandler);
internalRouters.use(authorizeUser);
internalRouters.post('/friend', addFriendHandler);
internalRouters.get('/friend', getFriendHandler);
internalRouters.delete('/friend/:id', deleteFriendHandler);
internalRouters.post('/friend/:id', editFriendHandler);
const upload = multer()
internalRouters.post('/friend-csv', upload.single('csvFile'), uploadCSVHandler);

app.use('/', internalRouters);

export default server;

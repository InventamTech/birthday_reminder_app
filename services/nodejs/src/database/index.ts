import mongoose from 'mongoose';
import logger from '../logger';
const dbUrl = 'mongodb+srv://pritesh:eDZze22ToTQ7kqtT@my-smitch.e0asp.mongodb.net/dev?retryWrites=true&w=majority' //process.env.DB_URL;
logger.debug(dbUrl)


mongoose.connect(dbUrl, {
	useFindAndModify: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
}, () => {
	logger.info('mongo db connected')
})

const mongoConnection = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
mongoConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));


export * from './model';

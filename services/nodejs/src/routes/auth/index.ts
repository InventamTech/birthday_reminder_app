import { Request, Response } from 'express';
import md5 from 'md5';
import { IUser, UserModel, IUserDocument } from '../../database';
import { getJwt } from '../../helpers';
import logger from '../../logger';
export const authHandler = async (req: Request, res: Response) => {
	const {
		email,
		googleToken,
		imageUrl,
		name
	}: IUser = req.body;
	try {
		if (
			!email ||
			!googleToken ||
			!name
		) {
			return res.status(400).json({
				error: 'Please send every mandaatory fields.'
			})
		}
		const user: any = await UserModel.findOne({
			email
		})
		if (user) {
			logger.debug(`found user : ${JSON.stringify(user)}`)
			const newUser: IUserDocument = await UserModel.updateOne({
				email
			}, { email, googleToken, imageUrl, name })
			const updatedUser: IUserDocument = await UserModel.findOne({
				email
			})
			const token = getToken(updatedUser)
			res.json({
				token,
				...{ email: updatedUser.email, imageUrl: updatedUser.imageUrl, name: updatedUser.name }
			})
		} else {
			logger.debug(`creating new user`)
			const newUser: IUserDocument = await UserModel.create({
				email,
				googleToken,
				imageUrl,
				name
			})
			const token = getToken(newUser)
			res.json({
				token,
				...{ email: newUser.email, imageUrl: newUser.imageUrl, name: newUser.name }
			})
		}
	} catch (error) {
		logger.error(`error while authHandler(login) using email: ${email} so sending 500`);
		console.log(error);
		res.sendStatus(500);
	}
};

const getToken = (user: IUserDocument) => {
	logger.debug(`user : ${JSON.stringify({
		email: user.email,
		name: user.name,
		id: user._id
	})}`)
	return getJwt({
		email: user.email,
		name: user.name,
		id: user._id
	});
};

import { Request, Response } from 'express';
import { FriendModel, IFriendDocument } from '../../database/model/friend';
import {
	IAuth
} from '../../helpers/jwt.helper';
import logger from '../../logger';
export const getFriendHandler = async (req: Request, res: Response) => {
	const tokenData = req.headers.tokenData as any as IAuth
	try {
		const friends: IFriendDocument[] = await FriendModel.find({
			userId: tokenData.id
		})
		return res.json({
			friends
		})
	} catch (error) {
		logger.error(`error while getFriendHandler using email: ${tokenData.email} so sending 500`);
		console.log(error);
		res.sendStatus(500);
	}
};
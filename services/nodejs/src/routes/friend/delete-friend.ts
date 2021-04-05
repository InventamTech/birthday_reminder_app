import { Request, Response } from 'express';
import { FriendModel } from '../../database/model/friend';
import {
	IAuth
} from '../../helpers/jwt.helper';
import logger from '../../logger';
export const deleteFriendHandler = async (req: Request, res: Response) => {
	const tokenData = req.headers.tokenData as any as IAuth
	const {
		id
	} = req.params
	try {
		await FriendModel.findByIdAndDelete(id)
		return res.json({
			message: 'deleted'
		})
	} catch (error) {
		logger.error(`error while deleteFriendHandler using email: ${tokenData.email} so sending 500`);
		console.log(error);
		res.sendStatus(500);
	}
};
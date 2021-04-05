import { Request, Response } from 'express';
import { FriendModel, IFriendDocument } from '../../database/model/friend';
import {
	IAuth
} from '../../helpers/jwt.helper';
import logger from '../../logger';
export const editFriendHandler = async (req: Request, res: Response) => {
	const tokenData = req.headers.tokenData as any as IAuth
	const {
		id
	} = req.params
	const {
		name,
		email,
		dob
	} = req.body
	try {
		const existingFriend: IFriendDocument = await FriendModel.findById(id)
		if (existingFriend) {
			await FriendModel.findByIdAndUpdate(id, {
				name,
				email,
				dob
			})
			return res.json({
				name,
				email,
				dob,
				id
			})
		} else {
			return res.json({
				error: true,
				message: 'Provided id of friend is not valid.'
			})
		}
	} catch (error) {
		logger.error(`error while editFriendHandler using email: ${tokenData.email} so sending 500`);
		console.log(error);
		res.sendStatus(500);
	}
};
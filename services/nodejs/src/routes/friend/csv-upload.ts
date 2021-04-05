import parse from 'csv-parse';
import { Request, Response } from 'express';
import { FriendModel, IFriendDocument } from '../../database/model/friend';
import {
	IAuth
} from '../../helpers/jwt.helper';
import logger from '../../logger';
export const uploadCSVHandler = async (req: Request, res: Response) => {
	const tokenData = req.headers.tokenData as any as IAuth
	try {
		// console.log(req.file.buffer)
		const insertData = []
		parse(req.file.buffer, { columns: true, trim: true }, async function (err, rows) {
			rows.forEach(({ name, email, dob }) => {
				// console.log({ name, email, dob })
				insertData.push({
					email,
					name,
					dob,
					userId: tokenData.id
				})
			});
			const friends: IFriendDocument[] = await FriendModel.insertMany(insertData)
			res.json({
				length: friends.length
			})
		})
	} catch (error) {
		logger.error(`error while uploadCSVHandler using email: ${tokenData.email} so sending 500`);
		console.log(error);
		res.sendStatus(500);
	}
};
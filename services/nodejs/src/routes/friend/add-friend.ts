import { Request, Response } from 'express';
import { IUser, IUserDocument } from '../../database';
import { FriendModel, IFriend, IFriendDocument } from '../../database/model/friend';
import logger from '../../logger';
import {
	IAuth
} from '../../helpers/jwt.helper'
import moment from 'moment';
export const addFriendHandler = async (req: Request, res: Response) => {
	const tokenData = req.headers.tokenData as any as IAuth
	const {
		name,
		email,
		dob,
	}: IFriend = req.body;
	try {
		if (
			!email ||
			!dob ||
			!name
		) {
			return res.status(400).json({
				error: 'Please send every mandaatory fields.'
			})
		}
		if (!moment(dob, 'DD-MM-YYYY', true).isValid()) {
			return res.status(400).json({
				error: "Please enter valid birthday format in 'DD-MM-YYYY'."
			})
		}
		const existingFriend: IFriendDocument = await FriendModel.findOne({
			email
		})
		if (existingFriend) {
			return res.json({
				error: true,
				message: 'Friend is already exists in list.',
				other: 'Kindly update it from the list itself.'
			})
		} else {
			const newFriend: IFriendDocument = await FriendModel.create({
				email,
				name,
				dob,
				userId: tokenData.id
			})
			return res.json({
				friend: {
					email: newFriend.email,
					name: newFriend.name,
					dob: newFriend.dob,
					id: newFriend._id
				}
			})
		}
	} catch (error) {
		logger.error(`error while addFriendHandler using email: ${tokenData.email} so sending 500`);
		console.log(error);
		res.sendStatus(500);
	}
};
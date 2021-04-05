import { Document, Model, model, Schema } from "mongoose";
export interface IFriend {
	name: string;
	email: string;
	dob: string;
	userId: string;
}
export interface IFriendDocument extends IFriend, Document { }
export interface IFriendModel extends Model<IFriendDocument> { }


const FriendSchema = new (Schema as any)({
	email: {
		type: String,
		required: true,
		unique: false,
		// validate: {
		// 	validator: async function (email) {
		// 		const user = await this.constructor.findOne({ email });
		// 		if (user) {
		// 			if (this.id === user.id) {
		// 				return true;
		// 			}
		// 			return false;
		// 		}
		// 		return true;
		// 	},
		// 	message: props => 'The specified email address is already in use.'
		// },
	},
	name: {
		type: String,
		required: true
	},
	dob: {
		type: String,
		required: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
})


export const FriendModel = model<IFriendDocument>("friend", FriendSchema);

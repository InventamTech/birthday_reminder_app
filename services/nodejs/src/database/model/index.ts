import { Document, Model, model, Schema } from "mongoose";
export interface IUser {
	name: string;
	email: string;
	googleToken: string;
	imageUrl: string;
}
export interface IUserDocument extends IUser, Document { }
export interface IUserModel extends Model<IUserDocument> { }


const UserSchema = new (Schema as any)({
	email: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String
	},
	name: {
		type: String,
		required: true
	},
	googleToken: {
		type: String,
		required: true
	},
})


export const UserModel = model<IUserDocument>("User", UserSchema);

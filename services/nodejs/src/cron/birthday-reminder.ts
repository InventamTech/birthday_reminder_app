import { groupBy } from 'lodash';
import cron from 'node-cron'
import { UserModel } from '../database';
import { FriendModel, IFriendDocument } from '../database/model/friend';
import { sendMail } from '../helpers';
import logger from '../logger';




/*
# ┌────────────── second (optional)
# │ ┌──────────── minute
# │ │ ┌────────── hour
# │ │ │ ┌──────── day of month
# │ │ │ │ ┌────── month
# │ │ │ │ │ ┌──── day of week
# │ │ │ │ │ │
# │ │ │ │ │ │
# * * * * * *
*/

const birthDayReminderTask = cron.schedule('* * 0/12 * * *', async () => {
	try {
		const friendsList: IFriendDocument[] = await FriendModel.find({}).populate('userId', 'email')
		friendsList.forEach(async ({ name, dob, userId }) => {
			const email = (userId as any).email
			console.log({
				name, dob, email
			})
			let html = "<html>"
			html += "you friend<h4> " + name + "</h4>has birthday today"
			html += "<html>"
			sendMail(email, html)
		})
		console.log('all the emails are in queue.')
	} catch (error) {
		logger.debug(`error came while cron job`)
		console.log(error)
	}
}, {
	scheduled: false
});


export default birthDayReminderTask;
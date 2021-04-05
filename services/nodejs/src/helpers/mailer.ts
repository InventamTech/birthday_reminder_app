import nodemailer from 'nodemailer'

export const sendMail = (to, html) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'mailtester436@gmail.com',
			pass: 'MailTester123123'
		}
	});
	const mailOptions = {
		from: 'mailtester436@email.com', // sender address
		to, // list of receivers
		subject: 'Birthday reminder', // Subject line
		html// plain text body
	};
	transporter.sendMail(mailOptions, function (err, info) {
		if (err)
			console.log(err)
		else
			console.log(info);
	});
}
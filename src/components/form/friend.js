import MomentUtils from "@date-io/moment";
import { CircularProgress, DialogContentText, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Field, Form, Formik } from 'formik';
import moment from "moment";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { addFriend, closeModal, openModal, editFriend, selectFriend } from '../../redux/actions';

class FriendForm extends Component {
	dateFormatter = str => {
		return str;
	};
	formValidationSchema = Yup.object().shape({
		name: Yup.string()
			.required('Name is mandatory.'),
		email: Yup.string()
			.email('Please enter valid email address.')
			.required('Email is mandatory.'),
		dob: Yup.string()
			.required('Date of birth is mandatory.'),
	});
	handleSubmit = (values) => {
		console.log('this.props.selectedFriend : ', this.props.selectedFriend)
		if (!this.props.selectedFriend) {
			console.log('insert')
			this.props.addFriend(values)
		} else {
			console.log('update')
			this.props.editFriend(values, this.props.selectedFriend._id)
		}
	}
	initialValues = {
		name: this.props.selectedFriend ? this.props.selectedFriend.name : '',
		email: this.props.selectedFriend ? this.props.selectedFriend.email : '',
		dob: this.props.selectedFriend ? this.props.selectedFriend.dob : ''
	}
	render() {
		return (
			<Dialog
				open={this.props.modal}
				onClose={this.props.closeModal}
				scroll="body"
				fullWidth={true}
				maxWidth={'sm'}
			>
				<DialogTitle id="form-dialog-title">
					{
						this.props.selectedFriend
							? 'Update friend'
							: 'Add Friend'
					}</DialogTitle>
				<DialogContent >
					<DialogContentText>
						<Formik
							initialValues={this.initialValues}
							validationSchema={this.formValidationSchema}
							onSubmit={this.handleSubmit}
						>
							{({
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								handleSubmit,
								isSubmitting,
								setFieldValue
							}) => (
								<Form>

									<Grid container spacing={3}>
										<Grid item xs={12}>
											<Field id="email" name="name">
												{({
													field, // { name, value, onChange, onBlur }
													meta: { touched, error },
												}) => (
													<TextField
														{...field}
														label="Name"
														variant="outlined"
														fullWidth
														error={touched && error}
														helperText={touched && error ? error : ''}
													/>
												)}
											</Field>
										</Grid>
										<Grid item xs={12}>
											<Field id="email" name="email">
												{({
													field, // { name, value, onChange, onBlur }
													meta: { touched, error },
												}) => (
													<TextField
														{...field}
														label="Email"
														variant="outlined"
														fullWidth
														error={touched && error}
														helperText={touched && error ? error : ''}
													/>
												)}
											</Field>
										</Grid>
										<Grid item xs={12}>
											<MuiPickersUtilsProvider utils={MomentUtils}>
												<KeyboardDatePicker
													fullWidth
													label="Date of birth"
													inputVariant="outlined"
													disableFuture={true}
													format={"DD-MM-YYYY"}
													placeholder={"DD-MM-YYYY"}
													value={values.dob ? moment(values.dob).format("DD-MM-YYYY") : moment().format("DD-MM-YYYY")}
													onChange={date => setFieldValue('dob', date ? date.format('DD-MM-YYYY') : '')}
													disableOpenOnEnter
													animateYearScrolling={true}
													autoOk={false}
													showTodayButton
													error={touched.dob && errors.dob}
													helperText={touched.dob && errors.dob ? errors.dob : ''}
												/>
											</MuiPickersUtilsProvider>
										</Grid>
										<Grid item container xs={12} justify="flex-end" spacing={2} direction="row">
											<Grid item xs={2}>
												<Button onClick={() => {
													this.props.closeModal()
													this.props.selectFriend(undefined)
												}} variant="contained">
													Cancel
												</Button>
											</Grid>
											<Grid item xs={2} style={{ marginLeft: 10 }}>
												<Button
													type="submit"
													color="primary"
													variant="contained"
													disabled={this.props.addFriendLoading ? true : false}
												>
													Save
												</Button>
											</Grid>
										</Grid>
									</Grid>

								</Form>
							)
							}
						</Formik>
					</DialogContentText>
				</DialogContent>
			</Dialog >

		);
	}
}

const mapStatesToProps = ({ dashboard, friends }) => {
	const {
		modal
	} = dashboard
	console.log(`friends : `, friends)
	const {
		addFriendLoading,
		selectedFriend
	} = friends
	return {
		modal,
		addFriendLoading,
		selectedFriend
	}
}

export default connect(mapStatesToProps, {
	openModal,
	closeModal,
	addFriend,
	editFriend,
	selectFriend
})(FriendForm);
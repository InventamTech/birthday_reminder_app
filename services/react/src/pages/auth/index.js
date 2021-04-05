import { Box, Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import {
	loginUser
} from '../../redux/actions';
class Login extends Component {
	responseGoogle = (resp) => {
		// console.log(resp)
		const {
			accessToken,
			profileObj: {
				email,
				name,
				imageUrl
			}
		} = resp
		this.props.loginUser({
			token: accessToken,
			email,
			userName: name,
			imageUrl
		}, this.props.history)
	}
	responseGoogleError = (resp) => {
		alert(JSON.stringify(resp))
	}
	render() {
		console.log('process.env.OAUTH_ID : ', process.env.OAUTH_ID)
		return (
			<Box
				display="flex"
				height='100vh'
			>
				<Box m="auto">
					<GoogleLogin
						clientId={process.env.OAUTH_ID || '702163324400-ajpmcrm5sackt92evpmuuopiammfholk.apps.googleusercontent.com'}
						render={renderProps => (
							// <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
							<Button
								variant="contained"
								startIcon={<CloudUploadIcon />}
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
							>
								Sign IN
							</Button>
						)}
						buttonText="Login"
						onSuccess={this.responseGoogle}
						onFailure={this.responseGoogleError}
						cookiePolicy={'single_host_origin'}
					/>
				</Box>
			</Box>
		);
	}
}
const mapStatesToProps = ({ authUser }) => {
	return {}
}
export default connect(mapStatesToProps, {
	loginUser
})(Login);
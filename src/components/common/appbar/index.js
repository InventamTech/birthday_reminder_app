import { AppBar, Avatar, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logoutUser } from '../../../redux/actions'
const useStyles = makeStyles((theme) => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
}));
export default function TopBar() {
	const classes = useStyles()
	// const [auth, setAuth] = React.useState(true);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const { imageUrl: profileImage, userName: name } = useSelector(({ authUser }) => authUser)
	const dispatch = useDispatch()
	const history = useHistory();
	const open = Boolean(anchorEl);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleLogout = () => {
		console.log('dispatching the action')
		dispatch(logoutUser(history))
	}
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar>
				<Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
					Reminder app
          </Typography>
				<Typography variant="subtitle1" noWrap>
					{name}
				</Typography>
				<div>
					<IconButton
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleMenu}
						color="inherit"
					>
						<Avatar alt={name} src={profileImage} />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={open}
						onClose={handleClose}
					>
						<MenuItem onClick={handleLogout}>Logout</MenuItem>
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	)
}

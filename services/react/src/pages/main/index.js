import { Toolbar, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import TopBar from '../../components/common/appbar';
import SideBar from '../../components/common/drawer';
import Dashboard from '../dashboard';

const useStyles = theme => ({
	root: {
		display: 'flex',
	},
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		// marginLeft: drawerWidth,
	},
});
class Main extends Component {
	render() {
		const classes = this.props.classes
		return (
			<div className={classes.root}>
				<TopBar />
				<SideBar />
				<main className={classes.content}>
					<Toolbar />
					<Dashboard />
				</main>
			</div>
		);
	}
}

export default withStyles(useStyles)(Main);
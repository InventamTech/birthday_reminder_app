import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { routes } from '../../../routes';
export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerContainer: {
		overflow: 'auto',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	selected: {
		color: 'primary'
	}
}));

export default function ClippedDrawer() {
	const classes = useStyles();

	return (
		// <div className={classes.root}>
		<>
			<CssBaseline />
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<Toolbar />
				<div className={classes.drawerContainer}>
					<List>
						{
							routes.map((item, index) => {
								if (item.sideBarVisibility) {
									return (
										<ListItem
											button
											key={item.name}
											selected={true}
											className={classes.selected}
										>
											<ListItemIcon>{item.icon}</ListItemIcon>
											<ListItemText primary={item.name} />
										</ListItem>
									)
								}
								return (<></>)
							})
						}
					</List>
				</div>
			</Drawer>
		</>
	);
}

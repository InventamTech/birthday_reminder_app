import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import TopBar from './components/common/appbar';
import Loader from './components/loader/index';
import SideBar from './components/common/drawer';
import { Toolbar, withStyles } from '@material-ui/core';
import Dashboard from './pages/dashboard'
import Login from './pages/auth'
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


const AuthRoute = ({ component: Component, authUser, classes, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				authUser.token ? (
					<div className={classes.root}>
						<TopBar />
						<SideBar />
						<main className={classes.content}>
							<Toolbar />
							<Component {...props} />
						</main>
					</div>
				) : (
					<Redirect
						to={{
							pathname: '/auth',
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
};



class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false
		}
	}
	// componentDidMount() {
	// 	setTimeout(() => {
	// 		this.setState({
	// 			loading: false
	// 		})
	// 	}, 1500);
	// }

	render() {
		const {
			authUser,
			classes
		} = this.props
		if (this.state.loading) {
			return (
				<Loader />
			)
		} else {
			return (
				<Router >
					<Switch>
						<Redirect path="/" exact={true} to="/app" />
						<AuthRoute path="/app" authUser={authUser} classes={classes} component={Dashboard} />
						<Route path="/auth" component={Login} />
						{/* <Route path="/error" exact render={(props) => <ViewError {...props} />} /> */}
						<Redirect to="/error" />
					</Switch>
				</Router >

			)
		}
	}
}

const mapStatesToProps = ({ authUser }) => {
	return {
		authUser
	}
}

export default withStyles(useStyles)(connect(mapStatesToProps, {})(App))
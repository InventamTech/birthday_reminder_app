import { Grid, TextField, withStyles, Fab, Paper, Typography, Box } from '@material-ui/core';
import React, { Component } from 'react';
import Friends from '../../components/table/friend-table';
import { dashboardStyle } from './style';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import {
	openModal,
	closeModal,
	searchTable
} from '../../redux/actions'
import FriendForm from '../../components/form/friend';
import {
	debounce
} from 'lodash'
class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			searchText: undefined
		}
	}
	openModal = () => {
		this.props.openModal();
	}
	handleTableFiler = debounce((e) => {
		this.props.searchTable(e.target.value)
	}, 300)
	render() {
		const {
			classes
		} = this.props
		return (
			<>
				<Paper elevation={2}>
					<Grid container spacing={1} justify="flex-end">
						<Grid item xs={6} container
							direction="row"
							justify="flex-start"
							alignItems="center">
							<Typography component="div" variant="h6" style={{ width: '95%', margin: 10 }}>
								<Box textAlign="left" m={1}>
									Friend list
								</Box>
							</Typography>
						</Grid>
						<Grid item xs={6}>

							<TextField
								style={{ width: '95%', margin: 10 }}
								className={classes.paper}
								id="search"
								label="Search friend"
								variant="outlined"
								onChange={this.handleTableFiler}
							/>

						</Grid>
						<Grid item xs={12}>
							<Friends />
						</Grid>

						{
							this.props.modal &&
							<FriendForm />
						}
					</Grid>
				</Paper>
				<Grid container spacing={3} justify="flex-end">
					<Fab aria-label="like" onClick={this.openModal} style={{ margin: 10 }}>
						<AddIcon />
					</Fab>
				</Grid>
			</>
		);
	}
}

const mapStatesToProps = ({ dashboard }) => {
	const {
		modal
	} = dashboard
	return {
		modal
	}
}

export default connect(mapStatesToProps, {
	openModal,
	closeModal,
	searchTable
})(withStyles(dashboardStyle)(Dashboard));
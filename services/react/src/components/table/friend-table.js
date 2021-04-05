import { CircularProgress, Divider, Grid, IconButton, withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	getFriend,
	deleteFriend,
	selectFriend,
	openModal
} from '../../redux/actions'
const useStyles = (theme) => ({
	root: {
		width: 'fit-content',
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: theme.shape.borderRadius,
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.secondary,
		'& svg': {
			margin: theme.spacing(0.5),
		},
		'& hr': {
			margin: theme.spacing(0, 0.5),
		},
	},
});
class Friends extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fullList: [],
			listToShow: []
		}
	}
	componentDidMount() {
		this.props.getFriend()
		this.filterList();
		this.setState({
			listToShow: this.props.fullList,
			fullList: this.props.fullList
		})
	}
	componentDidUpdate(prevProps) {
		if (prevProps.searchText !== this.props.searchText) {
			this.filterList();
		}
		if (JSON.stringify(prevProps.fullList) !== JSON.stringify(this.props.fullList)) {
			this.setState({
				fullList: this.props.fullList
			})
			this.filterList();
		}
	}
	filterList = () => {
		if (this.props.searchText) {
			const filteredList = this.state.fullList.filter(({ name, email, dob }) => {
				return name.toLowerCase().indexOf(this.props.searchText) > -1 || email.toLowerCase().indexOf(this.props.searchText) > -1
			});
			this.setState({
				listToShow: filteredList
			})
		} else {
			this.setState({
				listToShow: this.props.fullList
			})
		}
	}
	handleDelete = row => {
		const {
			_id
		} = row
		// alert(_id)
		this.props.deleteFriend(_id);
	}
	handleEdit = row => {
		this.props.selectFriend(row)
		this.props.openModal()
	}

	render() {
		return (
			<TableContainer >
				<Table style={{
					minWidth: 650,
				}} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell >Name</TableCell>
							<TableCell >Email</TableCell>
							<TableCell >Date of birth</TableCell>
							<TableCell ></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>

						{this.state.listToShow.length > 0
							? this.state.listToShow.map((row, index) => (
								<TableRow key={row.name + '_' + index}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell>{row.email}</TableCell>
									<TableCell>{row.dob}</TableCell>
									<TableCell>
										{
											this.props.actionLoader === row._id
												? <CircularProgress />
												: <Grid container alignItems="center"
													className={this.props.classes.root}
												>
													<IconButton
														onClick={() => this.handleDelete(row)}
														aria-label="delete"
														style={{ pading: 5 }}
													>
														<DeleteIcon style={{ fontSize: 20, color: 'red' }} />
													</IconButton>
													<Divider orientation="vertical" flexItem />
													<IconButton
														aria-label="edit"
														style={{ pading: 5, marginLeft: 5 }}
														onClick={() => this.handleEdit(row)}
													>
														<EditIcon style={{ fontSize: 20, color: 'red' }} />
													</IconButton>
												</Grid>
										}
									</TableCell>
								</TableRow>
							))
							: <TableRow>
								<TableCell component="th" scope="row" colSpan={4} align="center">
									No Friends
										</TableCell>
							</TableRow>
						}
						{
							this.props.loading
							&& <TableRow>
								<TableCell component="th" scope="row" colSpan={4} align="center">
									<CircularProgress />
								</TableCell>
							</TableRow>
						}
					</TableBody>
				</Table>
			</TableContainer>
		);
	}
}
const mapStatesToProps = ({ dashboard, friends }) => {
	const {
		searchText
	} = dashboard
	const {
		loading,
		friendList,
		error,
		actionLoader
	} = friends
	return {
		searchText,
		loading,
		error,
		actionLoader,
		fullList: friendList
	}
}


export default connect(mapStatesToProps, {
	getFriend,
	deleteFriend,
	selectFriend,
	openModal
})(withStyles(useStyles)(Friends));
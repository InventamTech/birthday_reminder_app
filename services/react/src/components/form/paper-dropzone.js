import { Button, Grid, List, ListItem, ListItemText, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import Dropzone, { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import {
	closeModal,
	selectFriend,
	bulkAddFriend
} from '../../redux/actions'
import friend from './friend'
export default function PaperDropzone() {
	const { getRootProps, getInputProps } = useDropzone()
	const dispatch = useDispatch()
	const loading = useSelector(({ friends }) => friends.addFriendLoading)
	const [files, setFiles] = useState([])
	const { ref, ...rootProps } = getRootProps()
	const handleDrop = acceptedFiles => {
		setFiles(acceptedFiles)
	}
	const handleUpload = () => {
		dispatch(bulkAddFriend(files))
	}
	return (
		<Grid container
			direction="row"
			justify="flex-end"
			alignItems="center"
		>
			<Grid item xs={12} >
				<Dropzone onDrop={handleDrop} accept="text/csv" >
					{({ getRootProps, getInputProps }) => (
						<Paper {...getRootProps({ className: "dropzone" })} >
							<input {...getInputProps()} />
							<Grid
								container
								direction="row"
								justify="center"
								alignItems="center"
								style={{
									height: 200,
									textAlign: 'center',
									// padding: 20,
									border: '3px dashed #eeeeee',
									borderColor: '#fafafa',
									color: '#bdbdbd'
								}}
							>
								{
									files.length === 0
									&& <Grid item>
										<p>Drag 'n' drop some files here, or click to select files</p>
									</Grid>
								}
								{
									files.length > 0
									&& <Grid item>
										<List>
											{
												files.map((file) => {
													console.log(file)
													return (
														<ListItem>
															<ListItemText primary={file.name} />
														</ListItem>
													)
												})
											}
										</List>
									</Grid>
								}
							</Grid>
						</Paper>
					)}
				</Dropzone>
			</Grid>
			<Grid item container xs={12} justify="flex-end" spacing={2} direction="row" style={{ marginTop: 10 }}>
				<Grid item xs={2}>
					<Button onClick={() => {
						setFiles([])
					}} variant="contained"
						disabled={loading ? true : false}>
						Clear
												</Button>
				</Grid>
				<Grid item xs={2}>
					<Button onClick={() => {
						dispatch(closeModal())
						dispatch(selectFriend(undefined))
					}} variant="contained"
						disabled={loading ? true : false}>
						Cancel
												</Button>
				</Grid>
				<Grid item xs={2} style={{ marginLeft: 10 }}>
					<Button
						onClick={handleUpload}
						color="primary"
						variant="contained"
						disabled={loading ? true : false}
					>
						Save
												</Button>
				</Grid>
			</Grid>
		</Grid>
	)
}
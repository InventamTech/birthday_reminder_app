import { Box, CircularProgress } from '@material-ui/core';
import React from 'react';

function Loader(props) {
	return (
		<Box
			display="flex"
			height='100vh'
		>
			<Box m="auto">
				<CircularProgress color="primary" size={70} />
			</Box>
		</Box>
	);
}

export default Loader;
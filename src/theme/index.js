import { createMuiTheme } from '@material-ui/core/styles';
// import purple from '@material-ui/core/colors/lightBlue';
// import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
	palette: {
		primary: {
			// main: purple[500],
			main: '#333D79FF',
		},
		secondary: {
			// main: green[500],
			main: '#FAEBEFFF',
		},
	},
});

export default theme
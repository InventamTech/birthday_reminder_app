
export const getHeader = (token = localStorage.getItem('back_token')) => {
	console.log(`process.env.REACT_APP_API_URL : `, process.env.REACT_APP_API_URL)
	return {
		baseURL: process.env.REACT_APP_API_URL,
		// baseURL: "http://localhost:3001",
		// ||'http://localhost:8081',
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
	}
};


export const getHeader = (token = localStorage.getItem('back_token')) => {
	return {
		// baseURL: 'http://develop.k2iywfdqzs.ap-southeast-1.elasticbeanstalk.com',
		baseURL: 'http://localhost:8081',
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
	}
};

module.exports = {
	schema: {
		[process.env.GRAPHCMS_KEY]: {
			headers: {
				Authorization: process.env.GRAPHCMS_AUTH_HEADER,
			},
		},
	},
};

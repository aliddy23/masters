module.exports = {
	apps: [
		{
			name: "masters",
			port: "3001",
			script: "./.output/server/index.mjs",
			watch: false,
		},
	],
};

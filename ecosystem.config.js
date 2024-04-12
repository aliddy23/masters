module.exports = {
	apps: [
		{
			name: "masters",
			port: "3001",
			exec_mode: "cluster",
			instances: "max",
			script: "./.output/server/index.mjs",
			watch: false,
		},
	],
};

module.exports = {
	apps: [
		{
			name: "Lookout",
			port: "3000",
			exec_mode: "cluster",
			instances: "max",
			script: "./build/server/index.mjs",
			watch: false,
		},
	],
};

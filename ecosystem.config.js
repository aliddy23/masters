module.exports = {
	apps: [
		{
			name: "masters",
			port: "3001",
			exec_mode: "cluster",
			interpreter: "bun",
			instances: 4,
			script: "./build/server/index.mjs",
			watch: false
		},
	],
};

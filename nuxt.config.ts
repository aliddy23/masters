import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
	devtools: {
		enabled: true,
		timeline: {
			enabled: true,
		},
	},
	css: ["vuetify/styles"],
	vite: {
		ssr: {
			noExternal: ["vuetify"],
		},
		vue: {
			template: {
				transformAssetUrls,
			},
		},
	},
	modules: [
		(_options, nuxt) => {
			nuxt.hooks.hook("vite:extendConfig", (config) => {
				// @ts-expect-error
				config.plugins.push(vuetify({ autoImport: true }));
			});
		},
		"nuxt-scheduler",
	],
	imports: {
		dirs: ["models", "controllers"],
	},
	ssr: false,
	components: ["~/components"],
	build: {
		transpile: ["vuetify"],
	},
	experimental: {
		asyncContext: true,
	},
	nitro: {
		compressPublicAssets: {
			gzip: true,
			brotli: true,
		},
	},
});

import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import "video.js/dist/video-js.css";

export default defineNuxtPlugin((nuxtApp) => {
	const vuetify = createVuetify({
		ssr: true,
		theme: {
			defaultTheme: "dark",
			themes: {
				dark: {
					dark: true,
					colors: {
						primary: "#146E4E",
						secondary: "#F9F400",
					},
				},
			},
		},
		icons: {
			defaultSet: "mdi",
		},
		defaults: {
			VBtn: {
				rounded: "lg",
			},
			VCard: {
				rounded: "lg",
				elevation: "8",
			},
			VList: {
				rounded: "lg",
			},
		},
	});

	nuxtApp.vueApp.use(vuetify);
});

<template>
	<v-app style="background: #121212">
		<v-app-bar density="compact" color="#146E4E">
			<img src="~/public/favicon.ico" style="height: 32px; width: 32px" class="ml-4" />
			<v-app-bar-title style="flex-grow: 2">
				<h6 class="text-h6 mb-0 pb-0 mt-n1 hidden-xs">The 88th Masters Tournament</h6>
				<h6 class="text-h6 mb-0 pb-0 mt-n1 hidden-sm-and-up">The 88th Masters</h6>
				<p class="text-overline mt-n3 mb-n2">April 11-14, 2024</p>
			</v-app-bar-title>

			<v-btn size="x-small" icon href="https://github.com/aliddy23/masters" target="_blank"><v-icon size="22">mdi-github</v-icon></v-btn>
		</v-app-bar>

		<v-main>
			<Stream />
		</v-main>
	</v-app>
</template>

<script setup lang="ts">
	useHead({
		title: "The 88th Masters Tournament",
		htmlAttrs: {
			lang: "en",
		},
		meta: [
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
			},
			{
				name: "theme-color",
				content: "#146E4E",
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes",
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black",
			},
			{
				name: "apple-mobile-web-app-title",
				content: "The Masters",
			},
			{
				name: "mobile-web-app-capable",
				content: "yes",
			},
			{
				name: "application-name",
				content: "The Masters",
			},
			{
				name: "full-screen",
				content: "yes",
			},
			{
				name: "browsermode",
				content: "application",
			},
			{
				name: "nightmode",
				content: "enable/disable",
			},
			{
				name: "layoutmode",
				content: "fitscreen/standard",
			},
			{
				name: "imagemode",
				content: "force",
			},
			{
				name: "x5-fullscreen",
				content: "true",
			},
			{
				name: "x5-page-mode",
				content: "app",
			},
			{
				name: "browsermode",
				content: "application",
			},
			{
				name: "x5-page-mode",
			},
		],
		link: [
			{
				href: "https://unpkg.com/video.js@8.0.4/dist/video-js.min.css",
				rel: "stylesheet",
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
			},
		],
	});
</script>

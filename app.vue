<template>
	<v-app style="background: #121212">
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
				href: "https://fonts.googleapis.com/css?family=Inter:300,400,500,700&display=swap",
			},
		],
	});
</script>

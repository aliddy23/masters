<template>
	<v-app>
		<v-main class="text-center px-4" style="height: 100vh; overflow-y: auto; max-width: 100vw; overflow-x: hidden">
			<h4 class="text-h4 mb-8">An error has occurred!</h4>
			<p class="mb-1">Status Code</p>
			<h1 class="text-h1 font-weight-bold">{{ error.statusCode }}</h1>
			<h5 class="text-h5 mt-8">{{ error.statusMessage }}</h5>

			<v-btn @click="handleError" color="primary" class="mt-9" prepend-icon="mdi-home" text="Go Home"></v-btn>

			<div v-if="error.stack" class="my-12">
				<h5 class="text-h5 mb-4">Technical Information</h5>
				<pre v-html="`${error.message}<br>${error.stack}`"></pre>
			</div>
		</v-main>
	</v-app>
</template>

<script setup lang="ts">
	const props = defineProps(["error"]);

	function handleError() {
		clearError();
		window.location.href = "/";
	}

	useHead({
		title: `Error ${props.error.statusCode} - The Masters`,
		htmlAttrs: {
			lang: "en",
		},
		link: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700",
			},
			{
				rel: "icon",
				type: "image/ico",
				href: "/favicon.ico",
			},
		],
	});
</script>

import { useScheduler } from "#scheduler";
import { updateFeeds } from "~/controllers/updateFeeds";
import { updateScoreboard } from "~/controllers/updateScoreboard";

export default defineNitroPlugin(async () => {
	await Promise.all([startFeedScheduler(), startScoreScheduler()]);
});

async function startFeedScheduler() {
	const scheduler = useScheduler();
	await updateFeeds();
	scheduler.run(async () => await updateFeeds()).everyMinute();
}

async function startScoreScheduler() {
	const scheduler = useScheduler();
	await updateScoreboard();
	scheduler.run(async () => await updateScoreboard()).everySeconds(15);
}

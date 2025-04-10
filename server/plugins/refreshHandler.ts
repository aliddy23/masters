import { useScheduler } from "#scheduler";
import { updateFeeds } from "~/controllers/updateFeeds";
import { updateScoreboard } from "~/controllers/updateScoreboard";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween.js'
dayjs.extend(isBetween)

export default defineNitroPlugin(async () => {
	if (dayjs().isBetween(dayjs("2025-04-10T00:00:00"), dayjs("2025-04-13T23:59:59")))
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
	scheduler.run(async () => await updateScoreboard()).everySeconds(20);
}

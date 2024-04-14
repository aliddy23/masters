import { getFeeds } from "~/controllers/getFeeds";

export default defineEventHandler(async (event) => {
	return await getFeeds();
});

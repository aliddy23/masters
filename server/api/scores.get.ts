import { getScoreboard } from "~/controllers/getScoreboard";

export default defineEventHandler(async (event) => {
	return await getScoreboard();
});

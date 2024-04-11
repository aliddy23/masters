import axios from "axios";

export default defineEventHandler(async (event) => {
	return axios
		.get("https://www.masters.com/en_US/scores/feeds/2024/scores.json", {
			headers: {
				Host: "www.masters.com",
				Connection: "keep-alive",
				"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0",
			},
		})
		.then((response) => {
			return response.data.data;
		});
});

import axios from "axios";
import { Feeds, type IFeeds } from "~/models/Feeds.model";

async function updateFeeds(): Promise<IFeeds> {
	const feeds = await axios
		.get("https://www.masters.com/en_US/cms/feeds/live/liveVideo.json", {
			headers: {
				Host: "www.masters.com",
				Connection: "keep-alive",
				"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0",
			},
		})
		.then((response) => {
			return response.data.channels.filter((i: any) => i.channelId != "ms" && i.channelId != "radio");
		});

	await Feeds.findOneAndReplace({}, { feeds });
	return feeds;
}

export { updateFeeds };

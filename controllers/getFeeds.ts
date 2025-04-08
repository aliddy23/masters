import { Feeds, type IFeeds, type IFeed } from "~/models/Feeds.model";

async function getFeeds(): Promise<IFeed[]> {
	return ((await Feeds.findOne()) as IFeeds)?.feeds || [];
}

export { getFeeds };

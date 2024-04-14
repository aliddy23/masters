import { Schema, model } from "mongoose";

interface IFeeds {
	feeds: IFeed[];
}

interface IFeed {
	caption: string;
	carousel_action: string;
	carousel_header: string;
	carousel_thumb: string;
	carousel_title: string;
	channelId: string;
	desktop: IFeedData[];
	featured_group: string;
	geoblock_url: string;
	imagePath: string;
	live: boolean;
	mobile: IFeedData[];
	name: string;
	relatedcontent: string;
	replay: string;
	streamlayer_id: string;
	type: string;
	upcoming_group: string;
	createdAt: Date;
	updatedAt: Date;
}

interface IFeedData {
	cdn: string;
	distribution: number;
	distributionEnd: number;
	distributionStart: number;
	url: string;
}

const FeedsSchema = new Schema<IFeeds>(
	{
		feeds: Array,
	},
	{ collection: "feeds", timestamps: true }
);

const Feeds = model<IFeeds>("feeds", FeedsSchema);

export { Feeds };
export type { IFeed, IFeedData, IFeeds };

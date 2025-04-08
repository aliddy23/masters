import type { Nitro } from "nitropack";
import mongoose from "mongoose";
import dayjs from "dayjs";

export default async (_nitroApp: Nitro) => {
	try {
		if (process.env.NODE_ENV === "development") await mongoose.connect("mongodb://127.0.0.1:27017/masters");
		else await mongoose.connect("mongodb://192.168.1.7:27017/masters");
		console.log(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss") + ` Connected to database!`);
	} catch (e) {
		console.error(e);
	}
};

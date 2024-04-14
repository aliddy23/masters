import type { Nitro } from "nitropack";
import mongoose from "mongoose";
import dayjs from "dayjs";

export default async (_nitroApp: Nitro) => {
	try {
		await mongoose.connect("mongodb://192.168.1.23:27017/masters");
		console.log(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss") + ` Connected to database!`);
	} catch (e) {
		console.error(e);
	}
};

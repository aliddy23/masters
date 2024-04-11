// import express, { Express, Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";

dotenv.config();

const app = express();
const port = process.env.PORT || 3011;

// mongoose.connect(`mongodb://golfrestream-mongo:27017/golf`).catch((error) => console.error(error));

app.get("/api/feeds", async (req, res) => {
	await axios
		.get("https://www.masters.com/en_US/cms/feeds/live/liveVideo.json", {
			headers: {
				Host: "www.masters.com",
				Connection: "keep-alive",
				"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0",
			},
		})
		.catch((error) => console.log(error))
		.then((response) => {
			res.json(response.data.channels.filter((i) => i.channelId != "ms" && i.channelId != "radio"));
		});
});

app.get("/api/scores", (req, res) => {
	axios
		.get("https://www.masters.com/en_US/scores/feeds/2024/scores.json", {
			headers: {
				Host: "www.masters.com",
				Connection: "keep-alive",
				"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0",
			},
		})
		.then((response) => {
			res.json(response.data.data);
		});
});

app.use("/", express.static("dist"));

app.listen(port, () => {
	console.log("listening on port", port);
});

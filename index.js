// import express, { Express, Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";

dotenv.config();

const app = express();
const port = process.env.PORT || 3011;

// mongoose.connect(`mongodb://golfrestream-mongo:27017/golf`).catch((error) => console.error(error));

app.get("/api", (req, res) => {
	axios.get("https://www.pgatour.com/_next/data/pgatour-prod-1.8.6/en/leaderboard.json").then((response) => {
		res.json(response.data.pageProps);
	});
});

app.get("/api/feeds", (req, res) => {
	axios.get("https://www.masters.com/en_US/cms/feeds/live/liveVideo.json").then((response) => {
		res.json(response.data.channels.filter((i) => i.channelId != "ms" && i.channelId != "radio"));
	});
});

app.get("/api/scores", (req, res) => {
	axios.get("https://www.masters.com/en_US/scores/feeds/2023/scores.json").then((response) => {
		res.json(response.data.data);
	});
});

app.listen(port, () => {
	console.log("listening on port", port);
});

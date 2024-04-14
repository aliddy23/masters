import { Scoreboard, type IScoreboard } from "~/models/Scoreboard.model";
import { updateScoreboard } from "./updateScoreboard";

async function getScoreboard(): Promise<IScoreboard> {
	return (await Scoreboard.findOne()) as IScoreboard;
}

export { getScoreboard };

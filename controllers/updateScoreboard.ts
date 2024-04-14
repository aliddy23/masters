import axios from "axios";
import { Scoreboard, type IScoreboard } from "~/models/Scoreboard.model";

async function updateScoreboard(): Promise<IScoreboard> {
	const oldScoreboard: IScoreboard = (await Scoreboard.findOne()) as IScoreboard;

	const newScoreboard: IScoreboard = await axios
		.get("https://www.masters.com/en_US/scores/feeds/2024/scores.json", {
			headers: {
				Host: "www.masters.com",
				Connection: "keep-alive",
				"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0",
			},
		})
		.then(async (response) => {
			let currentRound = 0;
			if (response.data.data.currentRound == "1000") currentRound = 1;
			else if (response.data.data.currentRound == "0100") currentRound = 2;
			else if (response.data.data.currentRound == "0010") currentRound = 3;
			else if (response.data.data.currentRound == "0001") currentRound = 4;
			response.data.data.currentRoundInt = currentRound;

			for (let player of response.data.data.player) {
				let total = 0;
				let totalPar = 0;

				for (let round = 1; round <= 4; round++) {
					let underPar = false;
					if (round == currentRound) {
						if (!player[`round${round}`].total) {
							player[`round${round}`].total = player[`round${round}`].scores.reduce(
								(accumulator: number, currentValue: number) => accumulator + currentValue,
								0
							);

							let par = 0;
							for (let i = 0; i < 18; i++) {
								if (player[`round${round}`].scores[i] != null) par += response.data.data.pars[`round${round}`][i];
							}
							underPar = player[`round${round}`].total < par;
							totalPar += par;
						} else {
							underPar = player[`round${round}`].total < 72;
							totalPar += 72;
						}
					} else if (round > currentRound) underPar = false;
					else {
						underPar = player[`round${round}`].total < 72;
						totalPar += 72;
					}

					total += player[`round${round}`].total;
					player[`round${round}`].underPar = underPar;
					player.total = total;
					player.totalPar = totalPar;
					player.totalUnderPar = total < totalPar;
				}
			}

			return response.data.data;
		});

	newScoreboard.movements = oldScoreboard.movements;

	for (const newPlayer of newScoreboard.player) {
		const oldPlayer = oldScoreboard.player.find((i) => i.id == newPlayer.id) as IPlayer;

		const hole = parseInt(newPlayer.thru);
		if (
			(newPlayer.thru != oldPlayer.thru || newPlayer.total != oldPlayer.total) &&
			newPlayer[`round${newScoreboard.currentRoundInt}`].scores[hole - 1] != null
		) {
			let direction: -1 | 0 | 1 = 0;

			if (parse(newPlayer.pos) > parse(oldPlayer.pos)) direction = -1;
			else if (parse(newPlayer.pos) < parse(oldPlayer.pos)) direction = 1;

			let movement: IMovement = {
				player: newPlayer.id,
				prev: {
					pos: oldPlayer.pos,
					thru: oldPlayer.thru,
					today: oldPlayer.today,
					topar: oldPlayer.topar,
					total: oldPlayer.total,
					totalUnderPar: oldPlayer.totalUnderPar,
				},
				new: {
					pos: newPlayer.pos,
					thru: newPlayer.thru,
					today: newPlayer.today,
					topar: newPlayer.topar,
					total: newPlayer.total,
					totalUnderPar: newPlayer.totalUnderPar,
					direction,
				},
				hole: {
					hole,
					shot: newPlayer.total - oldPlayer.total,
					par: newScoreboard.pars[`round${newScoreboard.currentRoundInt}`][hole - 1],
				},
			};

			const index = newScoreboard.movements.findIndex((i) => i.player == movement.player);
			if (index != -1) newScoreboard.movements.splice(index, 1);

			newScoreboard.movements.unshift(movement);
		}
	}

	await Scoreboard.findOneAndReplace({}, newScoreboard);
	return newScoreboard;
}

function parse(input: string): number {
	if (input.includes("T")) return parseInt(input.substring(1)) + 0.1;
	else return parseInt(input);
}

export { updateScoreboard };

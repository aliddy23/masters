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
			let currentRound = 0;
			if (response.data.data.currentRound == "1000") currentRound = 1;
			else if (response.data.data.currentRound == "0100") currentRound = 2;
			else if (response.data.data.currentRound == "0010") currentRound = 3;
			else if (response.data.data.currentRound == "0001") currentRound = 4;

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
					player.totalUnderPar = total < totalPar;
				}
			}
			return response.data.data;
		});
});

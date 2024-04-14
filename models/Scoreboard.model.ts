import { Schema, model } from "mongoose";

interface IScoreboard {
	_id: string;
	currentRound: "0000" | "1000" | "0100" | "0010" | "0001";
	currentRoundInt: number;
	pars: IRoundInt;
	player: IPlayer[];
	statusRound: string;
	wallClockTime: string;
	yardages: IRoundInt;
	movements: IMovement[];
	createdAt: Date;
	updatedAt: Date;
}

interface IRoundInt {
	round1: number[];
	round2: number[];
	round3: number[];
	round4: number[];
	[index: string]: number[];
}

interface IPlayer {
	active: boolean;
	amateur: boolean;
	countryCode: string;
	countryName: string;
	display_name: string;
	display_name2: string;
	epoch: number;
	first_name: string;
	firsttimer: boolean;
	full_name: string;
	group: string;
	groupHistory: string;
	holeProgress: number;
	id: string;
	image: boolean;
	intl: boolean;
	lastHoleWithShot: string;
	last_highlight: string;
	last_name: string;
	live: string;
	movement: string;
	newStatus: string;
	past: boolean;
	pos: string;
	round1: IPlayerRound;
	round2: IPlayerRound;
	round3: IPlayerRound;
	round4: IPlayerRound;
	sort_order: string;
	start: string;
	status: string;
	tee_order: string;
	teetime: string;
	thru: string;
	thruHistory: string;
	today: string;
	topar: string;
	total: number;
	totalPar: number;
	totalUnderPar: boolean;
	us: boolean;
	video: boolean;
	[index: string]: any;
}

interface IPlayerRound {
	fantasy: number;
	prior: any;
	roundStatus: string;
	scores: number[];
	total: number;
	underPar: boolean;
}

interface IMovement {
	player: string;
	hole: {
		hole: number;
		shot: number;
		par: number;
	};
	prev: {
		pos: string;
		thru: string;
		topar: string;
		today: string;
		total: number;
		totalUnderPar: boolean;
	};
	new: {
		pos: string;
		thru: string;
		topar: string;
		today: string;
		total: number;
		totalUnderPar: boolean;
		direction: -1 | 0 | 1;
	};
}

const ScoreboardSchema = new Schema<IScoreboard>(
	{
		currentRound: String,
		pars: Schema.Types.Mixed,
		player: Array,
		statusRound: String,
		wallClockTime: String,
		yardages: Schema.Types.Mixed,
		movements: Array,
	},
	{ collection: "scoreboard", timestamps: true }
);

const Scoreboard = model<IScoreboard>("scoreboard", ScoreboardSchema);

export { Scoreboard };
export type { IScoreboard, IRoundInt, IPlayer, IPlayerRound, IMovement };

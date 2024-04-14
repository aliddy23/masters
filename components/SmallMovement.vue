<template>
	<v-card class="mb-3 py-1">
		<v-row no-gutters>
			<v-col cols="3" class="d-flex" style="align-items: center; justify-content: center">
				<h5 class="text-h5 font-weight-black">{{ movement.new.pos }}</h5>
			</v-col>

			<v-col cols="6" class="d-flex" style="align-items: center">
				<h6 class="text-h6 text-uppercase" style="white-space: nowrap; text-overflow: ellipsis">{{ player.last_name }}</h6>
			</v-col>

			<v-col cols="3" class="d-flex pr-3" style="align-items: center; justify-content: flex-end">
				<h6
					class="text-h6 ml-2 font-weight-regular mr-5"
					:class="{
						'text-red': pInt(movement.new.topar) < 0,
						'text-green': pInt(movement.new.topar) >= 0 || movement.new.topar == 'E',
					}"
				>
					{{ movement.new.topar }}
				</h6>

				<div class="d-flex" style="align-items: baseline">
					<div
						class="score text-h5 font-weight-black mr-2"
						:class="{
							eagle:
								player[`round${currentRound}`].scores[movement.hole.hole - 1] <= scores.pars[`round${currentRound}`][movement.hole.hole - 1] - 2 &&
								player[`round${currentRound}`].scores[movement.hole.hole - 1] != null,
							birdie:
								player[`round${currentRound}`].scores[movement.hole.hole - 1] == scores.pars[`round${currentRound}`][movement.hole.hole - 1] - 1,
							bogey: player[`round${currentRound}`].scores[movement.hole.hole - 1] == scores.pars[`round${currentRound}`][movement.hole.hole - 1] + 1,
							dblbogey:
								player[`round${currentRound}`].scores[movement.hole.hole - 1] >= scores.pars[`round${currentRound}`][movement.hole.hole - 1] + 2,
						}"
					>
						{{ movement.hole.shot }}
					</div>
					<p>on</p>
					<h5 class="text-h5 ml-2">{{ movement.hole.hole }}</h5>
				</div>
			</v-col>
		</v-row>

		<v-menu open-on-hover :close-on-content-click="false" activator="parent" location="start">
			<Scorecard :player="player" :scores="scores" :currentRound="currentRound" />
		</v-menu>
	</v-card>
</template>

<script setup lang="ts">
	defineProps(["scores", "currentRound", "movement", "player"]);

	let pInt = (input: string) => {
		if (input == "F") return 18;
		return parseInt(input);
	};
</script>

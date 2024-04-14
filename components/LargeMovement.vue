<template>
	<v-card class="mb-3">
		<v-row no-gutters>
			<v-col cols="3">
				<v-img :src="`https://images.masters.com/players/2023/240x240/${player.id}.jpg`" class="rounded-be-lg elevation-6"></v-img>
			</v-col>

			<v-col cols="6" style="justify-content: center; flex-direction: column" class="pl-4 d-flex">
				<h5 class="text-h5 font-weight-bold mb-n2 text-uppercase" style="white-space: nowrap; text-overflow: ellipsis">{{ player.last_name }},</h5>
				<h6 class="text-h6 font-weight-regular">{{ player.first_name }}</h6>
			</v-col>

			<v-col cols="3" class="pr-3 d-flex" style="flex-direction: column; align-items: flex-end; justify-content: center">
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

				<p>
					Par
					<span class="text-h5 font-weight-medium">{{ movement.hole.par }}</span>
				</p>
			</v-col>

			<v-col cols="12" class="text-center px-1 pt-3 pb-1">
				<div class="d-flex">
					<div style="flex: 1">
						<h4 class="text-h4 font-weight-black mb-2">{{ movement.prev.pos }}</h4>
						<table class="text-center" style="white-space: nowrap">
							<thead>
								<tr>
									<th style="width: 100px" class="font-weight-regular text-body-2 text-grey-lighten-1">To Par</th>
									<th style="width: 100px" class="font-weight-regular text-body-2 text-grey-lighten-1">Today</th>
									<th style="width: 100px" class="font-weight-regular text-body-2 text-grey-lighten-1">Total</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td
										class="text-h5"
										:class="{
											'text-red': pInt(movement.prev.topar) < 0,
											'text-green': pInt(movement.prev.topar) >= 0 || movement.prev.topar == 'E',
										}"
									>
										{{ movement.prev.topar || "-" }}
									</td>
									<td
										class="text-h5"
										:class="{
											'text-red': pInt(movement.prev.today) < 0,
											'text-green': pInt(movement.prev.today) >= 0 || movement.prev.today == 'E',
										}"
									>
										{{ movement.prev.today || "-" }}
									</td>
									<td
										class="text-h5"
										:class="{
											'text-red': movement.prev.totalUnderPar,
											'text-green': !movement.prev.totalUnderPar,
										}"
									>
										{{ movement.prev.total || "-" }}
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<v-icon size="32" class="mx-2" style="margin-top: 3px">mdi-arrow-right</v-icon>

					<div style="flex: 1">
						<h4 class="text-h4 font-weight-black mb-2">{{ movement.new.pos }}</h4>
						<table class="text-center" style="white-space: nowrap">
							<thead>
								<tr>
									<th style="width: 100px" class="font-weight-regular text-body-2 text-grey-lighten-1">To Par</th>
									<th style="width: 100px" class="font-weight-regular text-body-2 text-grey-lighten-1">Today</th>
									<th style="width: 100px" class="font-weight-regular text-body-2 text-grey-lighten-1">Total</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td
										class="text-h5"
										:class="{
											'text-red': pInt(movement.new.topar) < 0,
											'text-green': pInt(movement.new.topar) >= 0 || movement.new.topar == 'E',
										}"
									>
										{{ movement.new.topar || "-" }}
									</td>
									<td
										class="text-h5"
										:class="{
											'text-red': pInt(movement.new.today) < 0,
											'text-green': pInt(movement.new.today) >= 0 || movement.new.today == 'E',
										}"
									>
										{{ movement.new.today || "-" }}
									</td>
									<td
										class="text-h5"
										:class="{
											'text-red': movement.new.totalUnderPar,
											'text-green': !movement.new.totalUnderPar,
										}"
									>
										{{ movement.new.total || "-" }}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
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

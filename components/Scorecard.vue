<template>
	<v-card style="background: #191919" class="rounded-lg">
		<v-row no-gutters>
			<v-col cols="2">
				<v-img :src="`https://images.masters.com/players/2023/240x240/${player.id}.jpg`" class="rounded-be-lg elevation-6">
					<h3 class="text-h3 pa-3 font-weight-black text-white" style="text-shadow: 0 0 6px black; position: absolute; bottom: 0px; right: 0px">
						{{ player?.pos }}
					</h3>
				</v-img>

				<div class="pa-4" v-if="player.status != 'C' && player.status != 'W'">
					<p><span class="font-weight-bold">Tee Time: </span>{{ player.teetime || "-" }}</p>
					<p><span class="font-weight-bold">Group: </span>{{ player.group || "-" }}</p>
					<p><span class="font-weight-bold">Thru: </span>{{ player.thru || "-" }}</p>
				</div>

				<div class="pa-4" v-else>
					<p v-if="player.status == 'C'">Missed Cut</p>
					<p v-else-if="player.status == 'W'">Withdrew</p>
				</div>
			</v-col>

			<v-col cols="10">
				<div class="ma-4 d-flex" style="align-items: baseline">
					<h4 class="text-h4 font-weight-medium">
						{{ player?.first_name }} {{ player?.last_name }}
						<span v-if="player?.amateur" class="text-overline ml-1">Amateur</span>
						<span v-else-if="player?.firsttimer" class="text-overline ml-1">First-Timer</span>
						<span v-else-if="player?.past" class="text-overline ml-1">Past Winner</span>
					</h4>
					<v-spacer></v-spacer>
					<h6
						class="text-h6 mr-3 font-weight-light"
						:class="{
							'text-red': player.totalUnderPar,
							'text-green': !player.totalUnderPar,
						}"
					>
						{{ player.total || "-" }}
					</h6>

					<h4
						class="text-h4 font-weight-regular"
						:class="{
							'text-red': pInt(player.topar) < 0,
							'text-green': pInt(player.topar) >= 0 || player.topar == 'E',
						}"
					>
						{{ player.topar || "-" }}
					</h4>
				</div>

				<v-table density="compact" class="bg-transparent">
					<thead style="background: #232323">
						<tr style="white-space: nowrap">
							<th class="text-center">Hole</th>
							<th class="text-center" :class="{ 'bg-primary': pInt(player.thru) == hole - 1 }" style="max-width: 45px" v-for="hole in 18">
								{{ hole }}
							</th>
							<th class="text-center" :class="{ 'bg-primary': pInt(player.thru) == 18 }">Total</th>
						</tr>
						<tr>
							<th class="text-center">Par</th>
							<th class="text-center" :class="{ 'bg-primary': pInt(player.thru) == hole - 1 }" v-for="hole in 18">
								{{ scores?.pars?.round1[hole - 1] }}
							</th>
							<th class="text-center" :class="{ 'bg-primary': pInt(player.thru) == 18 }">
								{{ par }}
							</th>
						</tr>
					</thead>
					<tbody v-if="scores.pars">
						<tr
							v-for="i in 4"
							:key="i"
							:class="{
								highlighted: currentRound == i,
							}"
						>
							<td class="text-center font-weight-bold">R{{ i }}</td>
							<td class="text-center" :class="{ 'bg-primary': pInt(player.thru) == hole - 1 }" v-for="hole in 18">
								<div
									class="score"
									:class="{
										eagle:
											player[`round${i}`].scores[hole - 1] <= scores.pars[`round${currentRound}`][hole - 1] - 2 &&
											player[`round${i}`].scores[hole - 1] != null,
										birdie: player[`round${i}`].scores[hole - 1] == scores.pars[`round${currentRound}`][hole - 1] - 1,
										bogey: player[`round${i}`].scores[hole - 1] == scores.pars[`round${currentRound}`][hole - 1] + 1,
										dblbogey: player[`round${i}`].scores[hole - 1] >= scores.pars[`round${currentRound}`][hole - 1] + 2,
									}"
								>
									{{ player[`round${i}`].scores[hole - 1] || "-" }}
								</div>
							</td>
							<td class="text-center" :class="{ 'bg-primary': pInt(player.thru) == 18, 'font-italic': !player[`round${i}`].total }">
								{{ player[`round${i}`].total || "-" }}
							</td>
						</tr>
					</tbody>
				</v-table>
			</v-col>
		</v-row>
	</v-card>
</template>

<script setup lang="ts">
	defineProps(["player", "scores", "currentRound"]);
	let par = ref(72);

	let pInt = (input: string) => {
		if (input == "F") return 18;
		return parseInt(input);
	};
</script>

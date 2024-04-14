<template>
	<div>
		<div v-for="(movement, index) in scores.movements">
			<LargeMovement
				v-if="index < 4"
				:scores="scores"
				:currentRound="currentRound"
				:movement="movement"
				:player="scores.player.find((i: IPlayer) => i.id == movement.player)"
			/>
			<SmallMovement
				v-else
				:scores="scores"
				:currentRound="currentRound"
				:movement="movement"
				:player="scores.player.find((i: IPlayer) => i.id == movement.player)"
			/>
		</div>

		<p class="text-grey font-italic text-center" v-if="scores.movements.length == 0">No movements.</p>
	</div>
</template>

<script setup lang="ts">
	defineProps(["scores", "currentRound"]);
</script>

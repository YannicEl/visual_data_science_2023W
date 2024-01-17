<template>
	<div class="flex flex-col items-center">
		<div class="-mb-2">{{ model }}</div>
		<div class="flex w-full items-center justify-center">
			<button @click="decrement" class="i-mdi-chevron-left p-2 text-3xl text-black"></button>

			<label class="flex w-full flex-col items-center">
				<input
					type="range"
					class="w-full"
					list="markers"
					v-model.number="model"
					:min="min"
					:max="max"
				/>
			</label>

			<button @click="increment" class="i-mdi-chevron-right p-2 text-3xl text-black"></button>
		</div>
	</div>
</template>

<script lang="ts" setup>
const { min, max } = defineProps<{
	min: number;
	max: number;
}>();

const model = defineModel<number>({ required: true });

function increment() {
	if (model.value + 1 <= max) {
		model.value++;
	}
}

function decrement() {
	if (model.value <= min) {
		model.value = min;
	} else {
		model.value--;
	}
}
</script>

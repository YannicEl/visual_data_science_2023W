<template>
	<div class="flex gap-4">
		<label class="custom-input">
			<span>From:</span>

			<input
				type="number"
				v-model="values.from"
				:min="min"
				:max="max"
				@input="emitValue({ from: ($event.target as HTMLInputElement).value })"
			/>
		</label>

		<label class="custom-input">
			<span>Till:</span>

			<input
				type="number"
				v-model="values.till"
				:min="min"
				:max="max"
				@input="emitValue({ till: ($event.target as HTMLInputElement).value })"
			/>
		</label>
	</div>
</template>

<script lang="ts" setup>
interface DateRange {
	from: number;
	till: number;
}

const { modelValue, min, max } = defineProps<{
	modelValue: DateRange;
	min?: number;
	max?: number;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: DateRange): void;
}>();

const values = computed(() => {
	return {
		from: modelValue.from,
		till: modelValue.till,
	};
});

function emitValue({ from, till }: { from?: number; till?: number }) {
	emit('update:modelValue', {
		from: from ? from : modelValue.from,
		till: till ? till : modelValue.till,
	});
}
</script>

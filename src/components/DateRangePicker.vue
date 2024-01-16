<template>
	<div class="flex gap-4">
		<label class="custom-input">
			<span>From:</span>

			<input
				type="date"
				v-model="values.from"
				:min="min"
				:max="max"
				@input="emitValue({ from: ($event.target as HTMLInputElement).value })"
			/>
		</label>

		<label class="custom-input">
			<span>Till:</span>

			<input
				type="date"
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
	from: Date;
	till: Date;
}

const { modelValue, min, max } = defineProps<{
	modelValue: DateRange;
	min?: string;
	max?: string;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: DateRange): void;
}>();

const values = computed(() => {
	return {
		from: dateToStirng(modelValue.from),
		till: dateToStirng(modelValue.till),
	};
});

function emitValue({ from, till }: { from?: string; till?: string }) {
	emit('update:modelValue', {
		from: from ? new Date(from) : modelValue.from,
		till: till ? new Date(till) : modelValue.till,
	});
}

function dateToStirng(date: Date): string {
	let month = (date.getMonth() + 1).toString();
	if (month.length === 1) month = '0' + month;

	let day = date.getDate().toString();
	if (day.length === 1) day = '0' + day;
	return `${date.getFullYear()}-${month}-${day}`;
}
</script>

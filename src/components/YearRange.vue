<template>
	<label class="flex">
		{{ model }}
		<input
			type="range"
			v-model.number="model"
			:min="filters.options.year.min"
			:max="filters.options.year.max"
		/>
	</label>
</template>

<script lang="ts" setup>
const { filters } = useData();

const model = defineModel<number>();
</script>

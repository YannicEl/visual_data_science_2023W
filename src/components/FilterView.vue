<template>
	<div class="flex flex-wrap gap-4">
		<label v-for="(options, key) in filters.options" class="custom-input">
			<span class="capitalize">{{ key.split('_').join(' ') }}</span>

			<select v-model="filters.values[key]">
				<option v-for="option in options">{{ option }}</option>
			</select>
		</label>

		<DateRangePicker v-model="filters.values.date" min="2021-05-31" max="2021-07-01" />
	</div>
</template>

<script lang="ts" setup>
const { filters } = useData();
</script>

<style scoped lang="scss"></style>

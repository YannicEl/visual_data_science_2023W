<template>
	<div class="flex flex-wrap gap-4">
		<label class="custom-input">
			<span class="capitalize">Country</span>

			<select v-model="filters.values.country_name">
				<option value="all">all</option>
				<option v-for="option in filters.options.country_name" :value="option">{{ option }}</option>
			</select>
		</label>

		<label class="custom-input">
			<span class="capitalize">Country</span>

			<select v-model="filters.values.country_name">
				<option value="all">all</option>
				<option v-for="option in filters.options.country_name" :value="option">{{ option }}</option>
			</select>
		</label>

		<YearRange v-model="filters.values.year" />
	</div>
</template>

<script lang="ts" setup>
const { filters } = useData();
</script>

<style scoped lang="scss"></style>

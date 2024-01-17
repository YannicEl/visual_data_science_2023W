<template>
	<div class="flex flex-wrap items-end gap-4">
		<label class="custom-input">
			<span>Country</span>

			<select v-model="filters.values.country_name" name="country_name">
				<option value="all">all</option>
				<option v-for="option in filters.options.country_name" :value="option">{{ option }}</option>
			</select>
		</label>

		<label class="custom-input">
			<span>First indicator</span>

			<select v-model="filters.values.first_indicator" name="first_indicator">
				<option
					v-for="option in filters.options.indicators"
					:value="option.value"
					class="capitalize"
				>
					{{ option.name }}
				</option>
			</select>
		</label>

		<label class="custom-input">
			<span>Second indicator</span>

			<select v-model="filters.values.second_indicator" name="second_indicator">
				<option
					v-for="option in filters.options.indicators"
					:value="option.value"
					class="capitalize"
				>
					{{ option.name }}
				</option>
			</select>
		</label>

		<label class="custom-input">
			<span>Year</span>

			<input
				type="number"
				name="year"
				v-model="filters.values.year"
				:min="filters.options.year.min"
				:max="filters.options.year.max"
			/>
		</label>

		<YearRange
			class="flex-1"
			v-model="filters.values.year"
			:min="filters.options.year.min"
			:max="filters.options.year.max"
		/>
	</div>
</template>

<script lang="ts" setup>
const { filters } = useData();
</script>

<style scoped lang="scss"></style>

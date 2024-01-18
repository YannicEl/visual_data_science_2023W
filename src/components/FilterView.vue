<template>
	<div class="flex flex-wrap items-end gap-4">
		<CountrySelect v-model="filters.values.country_code" :allOption="true" />

		<label class="custom-input">
			<span>Indicator</span>

			<select v-model="filters.values.first_indicator" name="first_indicator">
				<option v-for="option in filters.options.indicators" :value="option" class="capitalize">
					{{ indicatorToName(option) }}
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

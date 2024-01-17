<template>
	<label class="custom-input">
		<span>Country</span>

		<select v-model="model" name="country_name">
			<option v-if="allOption" value="all">all</option>
			<option v-for="option in filters.options.country_code" :value="option">
				{{ countryCodeToName(option) }}
			</option>
		</select>
	</label>
</template>

<script lang="ts" setup>
const { filters } = useData();

const { allOption } = defineProps<{
	allOption: boolean;
}>();

const model = defineModel<string>();
</script>

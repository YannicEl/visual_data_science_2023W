<template>
	<div class="border-2 border-black p-4">
		<div
			v-for="(key, index) in Object.keys(info)"
			:key="key"
			class="flex justify-between"
			:class="index % 2 ? 'bg-gray-50' : ''"
		>
			<div class="underline">{{ dataNameMapping[key] }}:</div>
			<div class="ml-1">
				{{ info[key] }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	// info: Data;
	info: any;
}>();

const dataNameMapping: Record<string, string> = {
	type: 'Type',
	date: 'Date',
	part_of_a_policing_operation: 'Part of a policing operation',
	latitude: 'Latitude',
	longitude: 'Longitude',
	gender: 'Gender',
	age_range: 'Age Range',
	self_defined_ethnicity: 'Self Defined Ethnicity',
	officer_defined_ethnicity: 'Officer Defined Ethnicity',
	legislation: 'Legislation',
	object_of_search: 'Object Of Search',
	outcome: 'Outcome',
	lad_name: 'Disctrict',
	lad_id: 'Disctrict Code',
};
</script>

<style scoped></style>

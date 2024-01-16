<script setup lang="ts">
const { loaded: dataLoaded } = useData();
const { loaded: boundariesLoaded } = useBoundariesData();
</script>

<template>
	<div
		v-if="dataLoaded && boundariesLoaded"
		class="grid h-screen grid-cols-2 grid-rows-[min-content] gap-4 p-4"
	>
		<FilterView class="col-span-2" />

		<MapView class="col-span-2" />
		<!-- <TableView /> -->
	</div>

	<div v-else class="w-scren flex h-screen items-center justify-center gap-4">
		<span class="flex-shrink-0 font-medium">Loading Data</span>
		<Spinner class="h-6 w-6 stroke-black" />
	</div>
</template>

<style scoped></style>

<template>
	<div class="flex flex-1 flex-col">
		<div ref="table" class="relative h-full">
			<ResponsiveTable v-if="data.length">
				<tr>
					<th v-for="column in columns" :key="column" class="capitalize">
						{{ column.split('_').join(' ') }}
					</th>
				</tr>

				<tr v-for="rowIndex in range">
					<td v-for="(value, key) in data[rowIndex]">
						{{ key === 'date' ? formatDate(value as string) : value }}
					</td>
				</tr>
			</ResponsiveTable>

			<div v-else class="font-medium">No data found with selected filter options.</div>
		</div>

		<div class="mt-4 flex items-center justify-end gap-4">
			<div>
				{{ page * chunkSize + 1 }} - {{ Math.min(page * chunkSize + chunkSize, data.length) }} of
				{{ data.length }}
			</div>

			<button @click="decrement" class="i-mdi-chevron-left p-2 text-2xl text-black"></button>
			<button @click="increment" class="i-mdi-chevron-right p-2 text-2xl text-black"></button>
		</div>
	</div>
</template>

<script lang="ts" setup>
const { data } = useData();
const columns = computed(() => Object.keys(data.value[0]));

// Reset page to 0 if data gets filtered
watch(data, () => {
	page.value = 0;
});

const table = ref<HTMLDivElement | null>();
const height = computed(() => table.value?.clientHeight ?? 0);

const itemHeight = 52;
const chunkSize = computed(() => Math.trunc((height.value - 33) / itemHeight));
const page = ref(0);
const range = computed(() => {
	return Array(chunkSize.value)
		.fill(null)
		.map((_, index) => {
			return page.value * chunkSize.value + index;
		});
});

function increment() {
	if ((page.value + 1) * chunkSize.value <= data.value.length) {
		page.value++;
	}
}

function decrement() {
	if (page.value <= 0) {
		page.value = 0;
	} else {
		page.value--;
	}
}
</script>

<style scoped lang="scss"></style>

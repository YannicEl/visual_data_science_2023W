<template>
	<div class="flex flex-col">
		<div class="relative flex h-full">
			<div ref="mapElement" class="w-full"></div>
			<div class="flex flex-col items-center pl-4 pr-2 text-xl font-semibold">
				<span>{{ range.max.toFixed(0) }}</span>
				<div class="h-full w-12 bg-gradient-to-b from-[#1984ff] to-white"></div>
				<span>{{ range.min }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { Expression } from 'mapbox-gl';
import type { Data } from '../composables/useData';

const { initMap, map } = useMapbox();
const { data, filters } = useData();

const mapElement = ref<HTMLDivElement>();

const range = computed(() => {
	let min = 0;
	let max = 0;

	data.value.forEach((row) => {
		const value = row[filters.value.values.first_indicator];
		if (value === 'NA') return;

		min = Math.min(min, value);
		max = Math.max(max, value);
	});

	return { min, max };
});

watch([data, filters.value.values], ([newData]) => {
	setData(newData);
});

watch(mapElement, (newValue) => {
	if (!newValue) return;

	const map = initMap(newValue);

	// const { initPopup } = useMapPopup();
	// initPopup();
	// bindMapPopup(map.);

	map.on('style.load', async () => {
		map.addSource('countries', {
			type: 'vector',
			url: 'mapbox://mapbox.country-boundaries-v1',
		});

		const WORLDVIEW = 'US';
		const worldview_filter = [
			'all',
			['==', ['get', 'disputed'], 'false'],
			['any', ['==', 'all', ['get', 'worldview']], ['in', WORLDVIEW, ['get', 'worldview']]],
		];

		// Add layer from the vector tile source to create the choropleth
		// Insert it below the 'admin-1-boundary-bg' layer in the style
		map.addLayer(
			{
				id: 'countries-join',
				type: 'fill',
				source: 'countries',
				'source-layer': 'country_boundaries',
				paint: {
					'fill-color': '#1984ff',
					'fill-opacity': getMatchExpression(data.value),
				},
				filter: worldview_filter,
			},
			'admin-1-boundary-bg'
		);

		map.on('click', 'countries-join', (event) => {
			const country = event.features?.[0]?.properties?.iso_3166_1_alpha_3;
			if (country) filters.value.values.country_code = country;
		});
	});
});

function setData(data: Data[]) {
	map.value?.setPaintProperty('countries-join', 'fill-opacity', getMatchExpression(data));
}

function getMatchExpression(data: Data[]): Expression {
	const matchExpression: Expression = ['match', ['get', 'iso_3166_1_alpha_3']];

	// Calculate color values for each country based on 'hdi' value
	data.forEach((row) => {
		const value = row[filters.value.values.first_indicator];

		if (value === 'NA') return;

		const opacity = Math.min(value / 100, 1);
		matchExpression.push(row['country_code'], opacity);
	});

	// Last value is the default, used where there is no data
	matchExpression.push(0);

	while (matchExpression.length < 4) matchExpression.push(0, 0);

	return matchExpression;
}
</script>

<style scoped lang="scss"></style>

<template>
	<div class="flex flex-col">
		<div class="relative h-full">
			<div id="map" class="absolute h-full"></div>
			<!-- <DetailView :info="hoverInfoCase" class="absolute right-0 top-0 h-full w-1/3" />
			<div class="absolute left-4 top-4 min-w-60 bg-black bg-opacity-80 p-4 text-white">
				{{ hoverInfoDistrict }}
			</div> -->

			<!-- <div class="h-100 min-w-40 absolute right-4 top-4 bg-black bg-opacity-80 p-4 text-white">
				<div class="flex h-full w-full flex-col">
					<div v-for="key in Object.keys(hoverInfoCase)" :key="key" class="flex">
						<div class="underline">{{ dataNameMapping[key] }}:</div>
						<div class="ml-1">
							{{ hoverInfoCase[key] }}
						</div>
					</div>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Expression } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Data } from '../composables/useData';

const { initMap, map } = useMapbox();
const { data, filters } = useData();

// const hoverInfoDistrict = ref('Hover over a district!');
// const hoverInfoCase = ref<Record<string, any>>({});

watch(data, (newData) => {
	setData(newData);
});

onMounted(() => {
	initMap([15.2551, 54.526], 'map');

	// const { initPopup } = useMapPopup();
	// initPopup();
	// bindMapPopup(map.value);

	map.value.on('style.load', async () => {
		map.value.addSource('countries', {
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
		map.value.addLayer(
			{
				id: 'countries-join',
				type: 'fill',
				source: 'countries',
				'source-layer': 'country_boundaries',
				paint: {
					'fill-color': getMatchExpression(data.value),
				},
				filter: worldview_filter,
			},
			'admin-1-boundary-bg'
		);

		// map.value.on('mousemove', (event) => {
		// 	const counts = map.value.queryRenderedFeatures(event.point, {
		// 		layers: ['boundaries-fill'],
		// 	});

		// 	const count = counts[0];
		// 	hoverInfoDistrict.value = count
		// 		? `${count.properties?.LAD13NM}: ${count.properties?.count} cases`
		// 		: 'Hover over a district!';

		// 	const cases = map.value.queryRenderedFeatures(event.point, {
		// 		layers: ['data'],
		// 	});

		// 	const caseFeature = cases[0];
		// 	if (caseFeature && caseFeature.properties) hoverInfoCase.value = caseFeature.properties;
		// 	// hoverInfoCase.value = caseFeature && caseFeature.properties ? caseFeature.properties : {};
		// });

		// map.value.on('click', 'boundaries-fill', (e) => {
		// 	if (!e.features || e.features.length === 0) return;
		// 	const feature = e.features[0];
		// 	if (!feature.properties) return;

		// 	filters.value.values.lad_name = feature.properties.LAD13NM;
		// });
	});
});

function setData(data: Data[]) {
	map.value.setPaintProperty('countries-join', 'fill-color', getMatchExpression(data));
}

function getMatchExpression(data: Data[]): Expression {
	const matchExpression: Expression = ['match', ['get', 'iso_3166_1_alpha_3']];

	// Calculate color values for each country based on 'hdi' value
	data.forEach((row) => {
		const value = row['enrolment_rate_pre_primary'];

		if (value === 'NA') return;

		const color = `rgb(${value.toFixed()}, 0, 0)`;

		matchExpression.push(row['country_code'], color);
	});

	// Last value is the default, used where there is no data
	matchExpression.push('rgba(0, 0, 0, 0)');

	return matchExpression;
}
</script>

<style scoped lang="scss"></style>

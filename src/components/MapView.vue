<template>
	<div class="flex flex-col">
		<div class="relative h-full">
			<div id="map" class="absolute h-full w-2/3"></div>
			<DetailView :info="hoverInfoCase" class="absolute right-0 top-0 h-full w-1/3" />
			<div class="absolute left-4 top-4 min-w-60 bg-black bg-opacity-80 p-4 text-white">
				{{ hoverInfoDistrict }}
			</div>

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
import 'mapbox-gl/dist/mapbox-gl.css';

const { initMap, map } = useMapbox();
const { filters } = useData();

const hoverInfoDistrict = ref('Hover over a district!');
const hoverInfoCase = ref<Record<string, any>>({});

onMounted(() => {
	initMap([15.2551, 54.526], 'map');

	// const { initPopup } = useMapPopup();
	// initPopup();
	// bindMapPopup(map.value);

	const data = [
		{ code: 'ROU', hdi: 0.811 },
		{ code: 'RUS', hdi: 0.816 },
		{ code: 'SRB', hdi: 0.787 },
		{ code: 'SVK', hdi: 0.855 },
		{ code: 'SVN', hdi: 0.896 },
		{ code: 'ESP', hdi: 0.891 },
		{ code: 'SWE', hdi: 0.933 },
		{ code: 'CHE', hdi: 0.944 },
		{ code: 'HRV', hdi: 0.831 },
		{ code: 'CZE', hdi: 0.888 },
		{ code: 'DNK', hdi: 0.929 },
		{ code: 'EST', hdi: 0.871 },
		{ code: 'FIN', hdi: 0.92 },
		{ code: 'FRA', hdi: 0.901 },
		{ code: 'DEU', hdi: 0.936 },
		{ code: 'GRC', hdi: 0.87 },
		{ code: 'ALB', hdi: 0.785 },
		{ code: 'AND', hdi: 0.858 },
		{ code: 'AUT', hdi: 0.908 },
		{ code: 'BLR', hdi: 0.808 },
		{ code: 'BEL', hdi: 0.916 },
		{ code: 'BIH', hdi: 0.768 },
		{ code: 'BGR', hdi: 0.813 },
		{ code: 'MKD', hdi: 0.757 },
		{ code: 'MLT', hdi: 0.878 },
		{ code: 'MDA', hdi: 0.7 },
		{ code: 'MNE', hdi: 0.814 },
		{ code: 'NLD', hdi: 0.931 },
		{ code: 'NOR', hdi: 0.953 },
		{ code: 'POL', hdi: 0.865 },
		{ code: 'PRT', hdi: 0.847 },
		{ code: 'HUN', hdi: 0.838 },
		{ code: 'ISL', hdi: 0.935 },
		{ code: 'IRL', hdi: 0.938 },
		{ code: 'ITA', hdi: 0.88 },
		{ code: 'LVA', hdi: 0.847 },
		{ code: 'LIE', hdi: 0.916 },
		{ code: 'LTU', hdi: 0.858 },
		{ code: 'LUX', hdi: 0.904 },
		{ code: 'UKR', hdi: 0.751 },
		{ code: 'GBR', hdi: 0.922 },
	];

	map.value.on('style.load', async () => {
		map.value.addSource('countries', {
			type: 'vector',
			url: 'mapbox://mapbox.country-boundaries-v1',
		});

		const matchExpression = ['match', ['get', 'iso_3166_1_alpha_3']];

		// Calculate color values for each country based on 'hdi' value
		for (const row of data) {
			// Convert the range of data values to a suitable color
			const green = row['hdi'] * 255;
			const color = `rgb(0, ${green}, 0)`;

			matchExpression.push(row['code'], color);
		}

		// Last value is the default, used where there is no data
		matchExpression.push('rgba(0, 0, 0, 0)');

		// The mapbox.country-boundaries-v1 tileset includes multiple polygons for some
		// countries with disputed borders.  The following expression filters the
		// map view to show the "US" perspective of borders for disputed countries.
		// Other world views are available, for more details, see the documentation
		// on the "worldview" feature property at
		// https://docs.mapbox.com/data/tilesets/reference/mapbox-countries-v1/#--polygon---worldview-text
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
					'fill-color': matchExpression,
				},
				filter: worldview_filter,
			},
			'admin-1-boundary-bg'
		);

		// map.value.addSource('boundaries-source', {
		// 	type: 'geojson',
		// 	data: {
		// 		...boundariesData.value,
		// 		features: boundariesData.value.features.map((feature) => {
		// 			return {
		// 				...feature,
		// 				properties: {
		// 					...feature.properties,
		// 					count: 0,
		// 				},
		// 			};
		// 		}),
		// 	},
		// });

		// map.value.addLayer({
		// 	id: 'boundaries-fill',
		// 	type: 'fill',
		// 	source: 'boundaries-source',
		// 	layout: {},
		// 	paint: {
		// 		'fill-color': '#0C7BDC',
		// 		'fill-opacity': ['interpolate', ['linear'], ['get', 'count'], 0, 0, 1256, 0.7],
		// 	},
		// });

		// map.value.addSource('boundaries-outline-source', {
		// 	type: 'geojson',
		// 	data: boundariesData.value,
		// });

		// map.value.addLayer({
		// 	id: 'boundaries-outline',
		// 	type: 'line',
		// 	source: 'boundaries-outline-source',
		// 	layout: {},
		// 	paint: {
		// 		'line-color': '#333',
		// 	},
		// });

		// map.value.addSource('data-source', {
		// 	type: 'geojson',
		// 	data: emptyGeoJSON,
		// });

		// map.value.addLayer({
		// 	id: 'data',
		// 	type: 'circle',
		// 	source: 'data-source',
		// 	paint: {
		// 		'circle-color': '#FFC20A',
		// 		'circle-radius': ['interpolate', ['linear'], ['zoom'], 8, 0, 9.5, 2, 19, 8],
		// 		'circle-opacity': 0.8,
		// 	},
		// });

		// mapboxDataTransform();

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

		map.value.on('click', 'boundaries-fill', (e) => {
			if (!e.features || e.features.length === 0) return;
			const feature = e.features[0];
			if (!feature.properties) return;

			filters.value.values.lad_name = feature.properties.LAD13NM;
		});
	});
});
</script>

<style scoped lang="scss"></style>

import { GeoJSONSource } from 'mapbox-gl';
import { dataToGeoJSON } from './dataToGeoJSON';

const { data } = useData();
const { boundariesData } = useBoundariesData();
const { map } = useMapbox();

watch(data, () => {
	if (!map.value) return;
	mapboxDataTransform();
});

export const mapboxDataTransform = () => {
	(map.value.getSource('data-source') as GeoJSONSource).setData(dataToGeoJSON(data.value));
	const accumulatedLAD = data.value.reduce(
		(acc, curr) => {
			if (!curr.lad_id) return acc;

			if (!acc[curr.lad_id]) {
				acc[curr.lad_id] = 0;
			}
			acc[curr.lad_id] += 1;
			return acc;
		},
		{} as Record<string, number>
	);

	const boundariesDataAcc = {
		...boundariesData.value,
		features: boundariesData.value.features.map((feature) => {
			const ladId = feature.properties?.LAD13CD;
			if (!ladId) return false;

			const count = accumulatedLAD[ladId];
			if (!count) return false;

			return {
				...feature,
				properties: {
					...feature.properties,
					count,
				},
			};
		}),
	};

	(map.value.getSource('boundaries-source') as GeoJSONSource).setData(
		boundariesDataAcc as GeoJSON.FeatureCollection<GeoJSON.Geometry>
	);
};

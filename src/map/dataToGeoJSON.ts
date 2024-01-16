import { Data } from '../composables/useData';

export const dataToGeoJSON = (data: Data[]): GeoJSON.FeatureCollection<GeoJSON.Geometry> => ({
	type: 'FeatureCollection',
	features: data.map((d) => ({
		type: 'Feature',
		properties: {
			...d,
		},
		geometry: {
			type: 'Point',
			coordinates: [d.longitude, d.latitude],
		},
	})),
});

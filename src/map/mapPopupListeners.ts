import { useMapPopup } from '../composables/useMapPopup';

export const bindMapPopup = (map: mapboxgl.Map) => {
	const { setPopup, hidePopup } = useMapPopup();

	map.on('mouseenter', ['data'], (e) => {
		if (!e.features || e.features.length === 0) return;
		const feature = e.features[0];
		if (!feature.properties) return;
		map.getCanvas().style.cursor = 'pointer';

		const layerId = feature.layer.id;

		if (layerId === 'data' && feature.geometry.type === 'Point') {
			setPopup('DATA', `${feature.properties.Type}`, [
				feature.geometry.coordinates[0],
				feature.geometry.coordinates[1],
			]);
		}
	});

	map.on('mouseleave', ['data', 'boundaries-fill'], () => {
		map.getCanvas().style.cursor = '';
		hidePopup();
	});
};

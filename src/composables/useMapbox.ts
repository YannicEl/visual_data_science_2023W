import mapboxgl from 'mapbox-gl';
import { ref, Ref } from 'vue';

const map = ref<mapboxgl.Map>();

export const useMapbox = () => {
	const init = (mapboxToken: string, center: [number, number], containerId: string) => {
		mapboxgl.accessToken = mapboxToken;

		map.value = new mapboxgl.Map({
			container: containerId,
			style: 'mapbox://styles/mapbox/light-v11',
			center: center,
			zoom: 8,
			maxZoom: 19,
		});
	};

	const centerMap = (center: { lat: number; lng: number }) => {
		map.value?.flyTo({ center, essential: true });
	};

	return {
		initMap: init,
		centerMap: centerMap,
		map: map as Ref<mapboxgl.Map>,
	};
};

import mapboxgl from 'mapbox-gl';
import { ref, Ref } from 'vue';

const map = ref<mapboxgl.Map>();

export const useMapbox = () => {
	const init = (center: [number, number], containerId: string) => {
		mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

		map.value = new mapboxgl.Map({
			container: containerId,
			style: 'mapbox://styles/mapbox/light-v11',
			center: center,
			zoom: 3,
			maxZoom: 19,
		});
	};

	return {
		initMap: init,
		map: map as Ref<mapboxgl.Map>,
	};
};

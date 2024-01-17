import { Map } from 'mapbox-gl';

const map = ref<Map>();

const centerOfEurope = { lat: 50, lon: 15 };

export const useMapbox = () => {
	function initMap(container: HTMLElement | string, center = centerOfEurope): Map {
		const ret = new Map({
			accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
			container,
			style: 'mapbox://styles/mapbox/light-v11',
			projection: {
				name: 'mercator',
			},
			center,
			zoom: 1.5,
			maxZoom: 19,
		});

		map.value = ret;
		return ret;
	}

	return {
		initMap,
		map,
	};
};

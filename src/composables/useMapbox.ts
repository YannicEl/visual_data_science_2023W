import mapboxgl, { LngLatLike } from 'mapbox-gl';

const map = ref<mapboxgl.Map>();

export const useMapbox = () => {
	const init = (container: HTMLElement, center: LngLatLike = [0, 0]) => {
		mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

		map.value = new mapboxgl.Map({
			container,
			style: 'mapbox://styles/mapbox/light-v11',
			projection: {
				name: 'mercator',
				center,
			},
			center,
			zoom: 3,
			maxZoom: 19,
		});
	};

	return {
		initMap: init,
		map: map as Ref<mapboxgl.Map>,
	};
};

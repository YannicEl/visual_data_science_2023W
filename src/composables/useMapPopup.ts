import mapboxgl from 'mapbox-gl';
import { useMapbox } from './useMapbox';

const { map } = useMapbox();
const mapPopup = ref<mapboxgl.Popup>();

export const useMapPopup = () => {
	const initPopup = () => {
		mapPopup.value = new mapboxgl.Popup({
			closeButton: true,
			closeOnClick: true,
		});
	};

	const setPopup = (title: string, content: string, lngLat: mapboxgl.LngLatLike) => {
		mapPopup.value
			?.setLngLat(lngLat)
			.setHTML(
				`
            <div class="map-popup">
                <div class='map-popup-title-wrapper'>
                    <div class='map-popup-title' title='Device Name'>${title}</div>
                </div>
                <pre class='map-popup-content'>${content}</pre>
            </div>
            `
			)
			.addTo(map.value);
	};

	const hidePopup = () => {
		mapPopup.value?.remove();
	};

	return {
		initPopup,
		setPopup,
		hidePopup,
	};
};

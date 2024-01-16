const boundariesData = ref<GeoJSON.FeatureCollection<GeoJSON.Geometry>>({
	features: [],
	type: 'FeatureCollection',
});

const loaded = ref(false);

export function useBoundariesData() {
	if (!loaded.value) loadBoundariesData();

	return { boundariesData, loaded };
}

export function loadBoundariesData() {
	import('../assets/eng_lad.json').then((res) => {
		boundariesData.value = res.default as GeoJSON.FeatureCollection<GeoJSON.Geometry>;
		loaded.value = true;
		console.log(`Loaded ${boundariesData.value.features.length} boundaries data items`);
	});
}

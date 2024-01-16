export interface Data {
	country_code: string;
	country_name: string;
	year: number;
	enrolment_rate_pre_primary: number | 'NA';
	enrolment_rate_primary: number | 'NA';
	enrolment_rate_secondary: number | 'NA';
}

const data = shallowRef<Data[]>([]);
const loaded = ref(false);

const filters = ref({
	values: {
		country_name: 'all',
		year: 2018,
		indicator: 'all',
	},
	options: {
		country_name: extractOptions('country_name'),
		year: extractOptions('year'),
		indicator: computed(() => [
			'enrolment_rate_pre_primary',
			'enrolment_rate_primary',
			'enrolment_rate_secondary',
		]),
	},
});

const filtered = computed(() => {
	console.time('filtering');
	const ret = data.value.filter((item) => {
		let ret = true;

		Object.entries(filters.value.values).forEach(([key, value]) => {
			if (value !== 'all' && item[key as keyof Data] !== value) ret = false;
		});

		// if (item.year < year.from || item.year > year.till) ret = false;

		return ret;
	});
	console.timeEnd('filtering');

	return ret;
});

export function useData() {
	if (!loaded.value) loadData();

	return { data: filtered, filters, loaded };
}

export function loadData() {
	import('../assets/data.json').then((res) => {
		data.value = res.default as Data[];
		loaded.value = true;
		console.log(`Loaded ${data.value.length} data items`);
	});
}

function extractOptions(key: keyof Data) {
	return computed(() => {
		const set = new Set<string | number>();
		data.value.forEach((item) => {
			set.add(item[key] as any);
		});

		return Array.from(set)
			.filter(Boolean)
			.sort((a, b) => {
				if (typeof a === 'number' && typeof b === 'number') {
					return b - a;
				}

				if (typeof a === 'string' && typeof b === 'string') {
					return a.localeCompare(b);
				}

				return 0;
			});
	});
}

export interface Data {
	country_code: string;
	country_name: string;
	year: number;
	enrolment_rate_pre_primary: number | 'NA';
	enrolment_rate_primary: number | 'NA';
	enrolment_rate_secondary: number | 'NA';
	annual_freshwater_withdrawals: number | 'NA';
	electric_power_consumption: number | 'NA';
	access_to_electricity: number | 'NA';
}

const data = shallowRef<Data[]>([]);
const loaded = ref(false);

const indicators = (
	[
		'enrolment_rate_pre_primary',
		'enrolment_rate_primary',
		'enrolment_rate_secondary',
		'annual_freshwater_withdrawals',
		'electric_power_consumption',
		'access_to_electricity',
	] as const
).map((key) => {
	return {
		value: key,
		name: key.split('_').join(' '),
	};
});

type Indicators = (typeof indicators)[number]['value'];

const filters = ref({
	values: {
		country_code: 'all',
		year: 2018,
		first_indicator: 'enrolment_rate_secondary' as Indicators,
		second_indicator: 'access_to_electricity' as Indicators,
	},
	options: {
		country_code: extractOptions('country_code'),
		year: extractRange('year'),
		indicators,
	},
});

const filtered = computed(() => {
	console.time('filtering');

	const { country_code, year } = filters.value.values;

	const ret = data.value.filter((item) => {
		let ret = true;

		Object.entries({ country_code, year }).forEach(([key, value]) => {
			if (value !== 'all' && item[key as keyof Data] !== value) ret = false;
		});

		return ret;
	});
	console.timeEnd('filtering');

	return ret;
});

export function useData() {
	if (!loaded.value) loadData();

	return { data: filtered, unfiltered: data, filters, loaded };
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
		const set = new Set<string>();
		data.value.forEach((item) => {
			set.add(item[key] as any);
		});

		return Array.from(set)
			.filter(Boolean)
			.sort((a, b) => a.localeCompare(b));
	});
}

function extractRange(key: keyof Data) {
	return computed(() => {
		let min: number = filters.value.values.year;
		let max: number = filters.value.values.year;

		data.value.forEach((row) => {
			const value = row[key];
			if (typeof value !== 'number') return;

			min = Math.min(min, value);
			max = Math.max(max, value);
		});

		return { min, max };
	});
}

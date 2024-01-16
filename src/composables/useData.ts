export interface Data {
	type: string;
	date: string;
	part_of_a_policing_operation: boolean;
	latitude: number;
	longitude: number;
	gender: string;
	age_range: string;
	self_defined_ethnicity: string;
	officer_defined_ethnicity: string;
	legislation: string;
	object_of_search: string;
	outcome: string;
	lad_name: string;
	lad_id: string;
}

const data = shallowRef<Data[]>([]);
const loaded = ref(false);

const filters = ref({
	values: {
		type: 'all',
		age_range: 'all',
		gender: 'all',
		self_defined_ethnicity: 'all',
		officer_defined_ethnicity: 'all',
		legislation: 'all',
		object_of_search: 'all',
		outcome: 'all',
		lad_name: 'all',
		part_of_a_policing_operation: 'all',
		date: {
			from: new Date('2021-05-31'),
			till: new Date('2021-07-01'),
		},
	},
	options: {
		type: extractOptions('type'),
		age_range: extractOptions('age_range'),
		gender: extractOptions('gender'),
		self_defined_ethnicity: extractOptions('self_defined_ethnicity'),
		officer_defined_ethnicity: extractOptions('officer_defined_ethnicity'),
		legislation: extractOptions('legislation'),
		object_of_search: extractOptions('object_of_search'),
		outcome: extractOptions('outcome'),
		lad_name: extractOptions('lad_name'),
		part_of_a_policing_operation: extractOptions('part_of_a_policing_operation'),
	},
});

const filtered = computed(() => {
	const { date, ...rest } = filters.value.values;

	console.time('filtering');
	const ret = data.value.filter((item) => {
		let ret = true;

		Object.entries(rest).forEach(([key, value]) => {
			if (value !== 'all' && item[key as keyof Data] !== value) ret = false;
		});

		const itemDate = new Date(item.date).valueOf();
		if (itemDate < date.from.valueOf() || itemDate > date.till.valueOf()) ret = false;

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
	import('../assets/data_boundaries.json').then((res) => {
		data.value = res.default as Data[];
		loaded.value = true;
		console.log(`Loaded ${data.value.length} data items`);
	});
}

function extractOptions(key: keyof Data) {
	return computed(() => {
		const set = new Set<string>(['all']);
		data.value.forEach((item) => {
			set.add(item[key] as any);
		});

		return Array.from(set).filter(Boolean);
	});
}

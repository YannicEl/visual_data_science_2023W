<template>
	<div>
		<div class="px-4">
			<label>
				Best
				<input type="radio" name="best" value="best" v-model="bestWorst" />
			</label>

			<label>
				Worst
				<input type="radio" name="worst" value="worst" v-model="bestWorst" />
			</label>
		</div>

		<div class="relative h-full w-full">
			<canvas ref="canvas" class="absolute inset-0"></canvas>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {
	BarController,
	BarElement,
	CategoryScale,
	Chart,
	ChartData,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';

const { data, filters } = useData();

const canvas = ref<HTMLCanvasElement>();
const chart = ref<Chart>();

const bestWorst = ref<'best' | 'worst'>('best');

Chart.register(BarController, BarElement, Title, CategoryScale, LinearScale, Tooltip);

watch(canvas, () => {
	drawChart();
});

watch([data, filters.value.values, bestWorst], () => {
	drawChart();
});

function drawChart() {
	if (!canvas.value) return;

	chart.value?.destroy();
	const { first_indicator } = filters.value.values;

	const data = getData();

	chart.value = new Chart(canvas.value, {
		type: 'bar',
		data,
		options: {
			plugins: {
				legend: {
					display: false,
				},
				title: {
					display: true,
					text: `${bestWorst.value === 'best' ? 'Best' : 'Worst'} ${data.datasets[0].data.length} countries for ${indicatorToName(filters.value.values.first_indicator)}`,
				},
				tooltip: {
					enabled: true,
					callbacks: {
						footer: ([item]) => {
							return (item.raw as any)?.country;
						},
					},
				},
			},
			scales: {
				x: {
					title: {
						display: true,
						text: 'Country',
					},
				},
				y: {
					title: {
						display: true,
						text: indicatorToName(first_indicator),
					},
				},
			},
			animation: false,
			maintainAspectRatio: false,
		},
	});
}

function getData(): ChartData<'bar'> {
	const { first_indicator } = filters.value.values;

	const slice = data.value
		.filter((item) => item[first_indicator] !== 'NA')
		.sort((a, b) => {
			if (bestWorst.value === 'best') {
				return (b[first_indicator] as number) - (a[first_indicator] as number);
			} else {
				return (a[first_indicator] as number) - (b[first_indicator] as number);
			}
		})
		.slice(0, 5);

	// .forEach((item) => {
	// 	labels.push(item.country_name);
	// 	data2.push(item[first_indicator]);
	// });

	return {
		labels: slice.map(({ country_name }) => country_name),
		datasets: [
			{
				data: slice.map((item) => item[first_indicator] as number),
				backgroundColor: slice.map(
					(_, i) => `rgb(25, 132, 255, ${1 - (1 / slice.length) * i + 0.2} )`
				),
			},
		],
	};
}
</script>

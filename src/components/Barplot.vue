<template>
	<div class="relative h-full w-full">
		<canvas ref="canvas" class="absolute inset-0"></canvas>
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

Chart.register(BarController, BarElement, Title, CategoryScale, LinearScale, Tooltip);

watch(canvas, () => {
	drawChart();
});

watch(data, () => {
	drawChart();
});

function drawChart() {
	if (!canvas.value) return;

	chart.value?.destroy();
	const { first_indicator, second_indicator } = filters.value.values;

	chart.value = new Chart(canvas.value, {
		type: 'bar',
		data: getData(),
		options: {
			plugins: {
				title: {
					display: true,
					text: 'Chart.js Bar Chart - Stacked',
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
						text: first_indicator.split('_').join(' '),
					},
				},
				y: {
					title: {
						display: true,
						text: 'Country',
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
			return (b[first_indicator] as number) - (a[first_indicator] as number);
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

<template>
	<div class="relative h-full w-full">
		<canvas ref="canvas" class="absolute inset-0"></canvas>
	</div>
</template>

<script lang="ts" setup>
import {
	CategoryScale,
	Chart,
	ChartData,
	Legend,
	LineController,
	LineElement,
	LinearScale,
	PointElement,
	Title,
} from 'chart.js';

const { unfiltered: data, filters } = useData();

const canvas = ref<HTMLCanvasElement>();
const chart = ref<Chart>();

Chart.register(
	Title,
	LineController,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Legend
);

watch(canvas, () => {
	drawChart();
});

watch([data, filters.value.values], () => {
	drawChart();
});

function drawChart() {
	if (!canvas.value) return;

	chart.value?.destroy();
	const { first_indicator } = filters.value.values;

	const data = getData();

	chart.value = new Chart(canvas.value, {
		type: 'line',
		data,
		options: {
			plugins: {
				title: {
					display: true,
					text: `${indicatorToName(filters.value.values.first_indicator)} over time`,
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
						text: 'Year',
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

	const { min, max } = filters.value.options.year;
	const labels = Array(max - min)
		.fill(0)
		.map((_, i) => min + i);

	return {
		labels,
		datasets: [
			{
				label: countryCodeToName(filters.value.values.country_code),
				data: data.value
					.filter((row) => row.country_code === filters.value.values.country_code)
					.sort((a, b) => a.year - b.year)
					.map((item) => item[first_indicator]) as number[],
				borderColor: '#1984ff',
			},
		],
	};
}
</script>

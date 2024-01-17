<template>
	<div>
		<canvas ref="canvas" class="h-full w-full"></canvas>
	</div>
</template>

<script lang="ts" setup>
import { Chart, ChartDataset, LinearScale, Point, PointElement, ScatterController } from 'chart.js';

const { data, filters } = useData();

const canvas = ref<HTMLCanvasElement>();
const chart = ref<Chart>();

Chart.register(ScatterController, PointElement, LinearScale);

watch(canvas, () => {
	drawChart();
});

watch(data, () => {
	drawChart();
});

function drawChart() {
	if (!canvas.value) return;

	chart.value?.destroy();

	chart.value = new Chart(canvas.value, {
		type: 'scatter',
		data: { datasets: [getDataset()] },
		options: {
			scales: {
				x: {
					type: 'linear',
					position: 'bottom',
				},
			},
			animation: false,
		},
	});
}

function getDataset(): ChartDataset<'scatter'> {
	const { first_indicator, second_indicator } = filters.value.values;

	return {
		label: `${first_indicator} / ${second_indicator}`,
		backgroundColor: '#1984ff',
		data: data.value
			.map((row) => {
				const x = row[first_indicator];
				const y = row[second_indicator];

				if (x === 'NA' || y === 'NA') return;

				return { x, y };
			})
			.filter(Boolean) as Point[],
	};
}
</script>

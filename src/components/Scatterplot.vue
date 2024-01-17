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

watch(canvas, async (canvas) => {
	if (!canvas) return;

	Chart.register(ScatterController, PointElement, LinearScale);

	chart.value = new Chart(canvas, {
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
});

watch(data, () => {
	console.log('hi');
	if (!chart.value) return;

	chart.value.data.datasets = [getDataset()];
	chart.value.update();
});

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

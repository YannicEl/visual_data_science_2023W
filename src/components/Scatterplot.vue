<template>
	<div class="flex h-full w-full flex-col">
		<label class="custom-input w-min px-4">
			<span>Compare against</span>

			<select v-model="filters.values.second_indicator" name="second_indicator">
				<option v-for="option in filters.options.indicators" :value="option" class="capitalize">
					{{ indicatorToName(option) }}
				</option>
			</select>
		</label>

		<div class="relative flex-1">
			<canvas ref="canvas" class="absolute inset-0"></canvas>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {
	Chart,
	ChartDataset,
	LinearScale,
	Point,
	PointElement,
	ScatterController,
	Title,
	Tooltip,
} from 'chart.js';

const { data, filters } = useData();

const canvas = ref<HTMLCanvasElement>();
const chart = ref<Chart>();

Chart.register(ScatterController, PointElement, LinearScale, Tooltip, Title);

watch(canvas, () => {
	drawChart();
});

watch([data, filters.value.values], () => {
	drawChart();
});

function drawChart() {
	if (!canvas.value) return;

	chart.value?.destroy();
	const { first_indicator, second_indicator } = filters.value.values;

	chart.value = new Chart(canvas.value, {
		type: 'scatter',
		data: { datasets: [getDataset()] },
		options: {
			plugins: {
				legend: {
					display: false,
				},
				title: {
					display: true,
					text: `${indicatorToName(first_indicator)} / ${indicatorToName(second_indicator)}`,
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
						text: indicatorToName(first_indicator),
					},
				},
				y: {
					title: {
						display: true,
						text: indicatorToName(second_indicator),
					},
				},
			},
			animation: false,
			maintainAspectRatio: false,
		},
	});
}

function getDataset(): ChartDataset<'scatter'> {
	const { first_indicator, second_indicator } = filters.value.values;

	return {
		backgroundColor: '#1984ff',
		data: data.value
			.map((row) => {
				const x = row[first_indicator];
				const y = row[second_indicator];

				if (x === 'NA' || y === 'NA') return;

				return { x, y, country: row.country_name };
			})
			.filter(Boolean) as Point[],
	};
}
</script>

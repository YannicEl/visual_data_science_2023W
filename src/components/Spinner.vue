<template>
	<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<circle cx="12" cy="12" r="10" />
	</svg>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
circle {
	stroke: inherit;
	stroke-width: 2;
	stroke-linecap: round;
	stroke-dasharray: 70;
	stroke-dashoffset: 30;
	fill: transparent;
	animation: rotation 0.6s linear infinite;
	transform-origin: center;
}

@keyframes rotation {
	100% {
		transform: rotate(1turn);
	}
}
</style>

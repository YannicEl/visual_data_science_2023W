<template>
	<div class="scrollbar-thicc absolute inline h-full w-full overflow-x-auto overflow-y-hidden">
		<table class="w-full">
			<slot />
		</table>
	</div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
table {
	& :slotted(td) {
		@apply py-4 text-sm font-semibold;
	}

	& :slotted(tr) {
		// table heading
		&:first-child th {
			@apply pb-2 text-left;
		}

		// padding on cells
		& td,
		& th {
			@apply whitespace-nowrap pr-6;

			&:first-child {
				@apply pl-6;
			}
		}

		&:nth-child(1n) {
			@apply bg-white;
		}

		// bg every 2. row
		&:nth-child(2n) {
			@apply bg-gray-100;
		}
	}
}

.scrollbar-thicc {
	&::-webkit-scrollbar {
		width: 5px;
		height: 7px;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 9999px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgb(148, 148, 148);
	}

	&::-webkit-scrollbar-track {
		background-color: #f3f4f6;
	}
}
</style>

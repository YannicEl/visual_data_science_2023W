<template>
	<div class="flex flex-wrap gap-4">
		<label v-for="(options, key) in filters.options" class="custom-input">
			<span class="capitalize">{{ key.split('_').join(' ') }}</span>

			<select v-model="filters.values[key]">
				<option value="all">all</option>
				<option v-for="option in options" :value="option">{{ option }}</option>
			</select>
		</label>
	</div>
</template>

<script lang="ts" setup>
const { filters } = useData();
</script>

<style scoped lang="scss"></style>

<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { getTrigger } from "../ctx.js";
	import type { TriggerEvents, TriggerProps } from "../index.js";
	import { createDispatcher } from "$lib/internal/events.js";

	type $$Props = TriggerProps;
	type $$Events = TriggerEvents;

	export let asChild: $$Props["asChild"] = false;
	export let el: $$Props["el"] = undefined;

	const {
		elements: { trigger },
		props,
		getAttrs,
	} = getTrigger();
	const dispatch = createDispatcher();
	const attrs = getAttrs("trigger");

	$: builder = $trigger({
		...$props,
	});
	$: Object.assign(builder, attrs);
</script>

{#if asChild}
	<slot {builder} />
{:else}
	<button
		bind:this={el}
		use:melt={builder}
		type="button"
		{...$$restProps}
		on:m-keydown={dispatch}
		on:m-click={dispatch}
	>
		<slot {builder} />
	</button>
{/if}

<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { getCtx } from "../ctx.js";
	import type { NextButtonEvents, NextButtonProps } from "../index.js";
	import { createDispatcher } from "$lib/internal/events.js";

	type $$Props = NextButtonProps;
	type $$Events = NextButtonEvents;

	export let asChild: $$Props["asChild"] = false;
	export let el: $$Props["el"] = undefined;

	const {
		elements: { nextButton },
		getAttrs,
	} = getCtx();

	const attrs = getAttrs("next-button");
	const dispatch = createDispatcher();

	$: builder = $nextButton;
	$: Object.assign(builder, attrs);
</script>

{#if asChild}
	<slot {builder} />
{:else}
	<button bind:this={el} use:melt={builder} type="button" {...$$restProps} on:m-click={dispatch}>
		<slot {builder} />
	</button>
{/if}

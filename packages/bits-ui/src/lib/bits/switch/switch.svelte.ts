import { getContext, setContext } from "svelte";
import {
	getAriaChecked,
	getAriaRequired,
	getDataChecked,
	getDataDisabled,
	getDataRequired,
} from "$lib/internal/attrs.js";
import type { BoxedValues, ReadonlyBoxedValues } from "$lib/internal/box.svelte.js";
import { kbd } from "$lib/internal/kbd.js";

type SwitchRootStateProps = ReadonlyBoxedValues<{
	disabled: boolean;
	required: boolean;
	name: string | undefined;
	value: string;
}> &
	BoxedValues<{
		checked: boolean;
	}>;

class SwitchRootState {
	checked = undefined as unknown as SwitchRootStateProps["checked"];
	disabled = undefined as unknown as SwitchRootStateProps["disabled"];
	required = undefined as unknown as SwitchRootStateProps["required"];
	name: SwitchRootStateProps["name"];
	value: SwitchRootStateProps["value"];

	constructor(props: SwitchRootStateProps) {
		this.checked = props.checked;
		this.disabled = props.disabled;
		this.required = props.required;
		this.name = props.name;
		this.value = props.value;
	}

	#toggle() {
		this.checked.value = !this.checked.value;
	}

	#onkeydown = (e: KeyboardEvent) => {
		if (!(e.key === kbd.ENTER || e.key === kbd.SPACE) || this.disabled.value) return;
		e.preventDefault();
		this.#toggle();
	};

	#onclick = () => {
		if (this.disabled.value) return;
		this.#toggle();
	};

	createInput() {
		return new SwitchInputState(this);
	}

	createThumb() {
		return new SwitchThumbState(this);
	}

	props = $derived({
		"data-disabled": getDataDisabled(this.disabled.value),
		"data-state": getDataChecked(this.checked.value),
		"data-required": getDataRequired(this.required.value),
		role: "switch",
		"aria-checked": getAriaChecked(this.checked.value),
		"aria-required": getAriaRequired(this.required.value),
		"data-switch-root": "",
		//
		onclick: this.#onclick,
		onkeydown: this.#onkeydown,
	} as const);
}

class SwitchInputState {
	#root = undefined as unknown as SwitchRootState;
	shouldRender = $derived(this.#root.name.value !== undefined);

	constructor(root: SwitchRootState) {
		this.#root = root;
	}

	props = $derived({
		type: "checkbox",
		name: this.#root.name.value,
		value: this.#root.value.value,
		checked: this.#root.checked.value,
		disabled: this.#root.disabled.value,
		required: this.#root.required.value,
	} as const);
}

class SwitchThumbState {
	root = undefined as unknown as SwitchRootState;

	constructor(root: SwitchRootState) {
		this.root = root;
	}

	props = $derived({
		"data-disabled": getDataDisabled(this.root.disabled.value),
		"data-state": getDataChecked(this.root.checked.value),
		"data-required": getDataRequired(this.root.required.value),
		"data-switch-thumb": "",
	} as const);
}

//
// CONTEXT METHODS
//

const SWITCH_ROOT_KEY = Symbol("Switch.Root");

export function setSwitchRootState(props: SwitchRootStateProps) {
	return setContext(SWITCH_ROOT_KEY, new SwitchRootState(props));
}

export function getSwitchRootState(): SwitchRootState {
	return getContext(SWITCH_ROOT_KEY);
}

export function getSwitchInputState(): SwitchInputState {
	return getSwitchRootState().createInput();
}

export function getSwitchThumbState(): SwitchThumbState {
	return getSwitchRootState().createThumb();
}
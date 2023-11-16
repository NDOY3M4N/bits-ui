import type { APISchema } from "@/types";
import { asChild, enums } from "@/content/api-reference/helpers.js";
import type * as Avatar from "$lib/bits/avatar/_types";
import * as C from "@/content/constants.js";

export const root: APISchema<Avatar.Props> = {
	title: "Root",
	description: "The root component used to set and manage the state of the avatar.",
	props: {
		delayMs: {
			type: C.NUMBER,
			default: "0",
			description:
				"How long to wait before showing the image after it has loaded. This can be useful to prevent a harsh flickering effect when the image loads quickly."
		},
		loadingStatus: {
			type: {
				type: "LoadingStatus",
				definition: enums("loading", "loaded", "error")
			},
			description:
				"The loading status of the avatars source image. You can bind a variable to track the status outside of the component and use it to show a loading indicator or error message."
		},
		onLoadingStatusChange: {
			type: {
				type: C.FUNCTION,
				definition: "(status: LoadingStatus) => void"
			},
			description: "A callback function called when the loading status of the image changes."
		},
		asChild
	}
};

export const image: APISchema<Avatar.ImageProps> = {
	title: "Image",
	description: "The avatar image displayed once it has loaded.",
	props: {
		src: {
			type: "HTMLImgAttributes['src']",
			description:
				"The source of the image. This is typed the same as the native `img` element so you can use any valid `img` `src` value."
		},
		alt: {
			type: "HTMLImgAttributes['src']",
			description:
				"The alt text of the image. This is typed the same as the native `img` element so you can use any valid `img` `alt` value."
		},
		asChild
	}
};

export const fallback: APISchema<Avatar.FallbackProps> = {
	title: "Fallback",
	description: "The fallback displayed while the avatar image is loading or if it fails to load",
	props: { asChild }
};

export const avatar = [root, image, fallback];

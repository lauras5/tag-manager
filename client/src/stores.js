import {writable} from 'svelte/store';

export const tags = writable([]);
export const limit = writable(100);
export const page = writable(0);
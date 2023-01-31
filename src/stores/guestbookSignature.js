import { writable } from 'svelte/store';

export const guestBook = writable({
  names: "unknown",
  from: "unknown",
  deck: "unknown",
  location: "unknown"
})
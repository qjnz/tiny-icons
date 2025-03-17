// src/index.js
export { default as SvelteIcon } from './Icon.svelte';

// Optionally provide a utility function to preload icons
export async function preloadIcon(name) {
  return import(`./icons/${name}.svg`);
}

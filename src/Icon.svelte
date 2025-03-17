<!-- src/Icon.svelte -->
<script>
  import { onMount } from 'svelte';
  
  export let name = '';
  export let size = '24px';
  export let color = 'currentColor';
  
  let iconContent = null;
  let loading = false;
  let error = false;
  
  $: if (name) {
    loadIcon(name);
  }
  
  async function loadIcon(iconName) {
    if (!iconName) return;
    
    try {
      loading = true;
      error = false;
      
      // Dynamic import - will be code-split by Rollup
      const module = await import(`../dist/icons/${iconName}.js`);
      iconContent = module.default || module[iconName];
      
    } catch (e) {
      console.error(`Failed to load icon: ${iconName}`, e);
      error = true;
      iconContent = null;
    } finally {
      loading = false;
    }
  }
</script>

{#if loading}
  <div class="svelte-icon-loading" style="width: {size}; height: {size};"></div>
{:else if error}
  <div class="svelte-icon-error" style="width: {size}; height: {size};"></div>
{:else if iconContent}
  <div class="svelte-icon" style="width: {size}; height: {size}; color: {color};">
    {@html iconContent}
  </div>
{:else}
  <div class="svelte-icon-empty" style="width: {size}; height: {size};"></div>
{/if}

<style>
  .svelte-icon {
    display: inline-block;
    line-height: 0;
  }
  
  .svelte-icon :global(svg) {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
  
  .svelte-icon-empty, 
  .svelte-icon-loading,
  .svelte-icon-error {
    display: inline-block;
  }
</style>

<!--
From https://github.com/rsdavis/svelte-drawer
-->
<script>
  import { onMount } from 'svelte'
  import { createEventDispatcher } from 'svelte'

  export let open         = false;
  export let duration     = 0.2;
  export let placement    = "left";
  export let size         = null;
  let mounted = false

  const dispatch = createEventDispatcher()
  $: style = `--duration: ${duration}s; --size: ${size};`;

  function scrollLock(open) {
    if (mounted) {
        const body = document.querySelector("body");
        body.style.overflow = open ? 'hidden' : 'auto'
    }
  }

  $: scrollLock(open)

  function handleClickAway () {
    dispatch('clickAway')
  }

  onMount(() => {
    mounted = true
    scrollLock(open)
  })
</script>

<aside class="drawer" class:open {style}>

  <div class="overlay" on:click={handleClickAway}></div>

  <div class="panel {placement}" class:size>
    <slot />
  </div>

</aside>

<style lang="scss">
@use "$styles/variables" as *;

aside.drawer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  transition: z-index var(--duration) step-end;

  div {
    &.panel {
      position: fixed;
      width: 100%;
      height: 100%;
      background: $background-accent-color;
      z-index: 3;
      transition: transform var(--duration) ease;
      overflow: auto;
      box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.5);
    }

    &.left {
      left: 0;
      transform: translate(-100%, 0);

      &.size {
        max-width: var(--size);
      }
    }

    &.right {
      right: 0;
      transform: translate(100%, 0);

      &.size {
        max-width: var(--size);
      }
    }

    &.top {
      top: 0;
      transform: translate(0, -100%);

      &.size {
        max-height: var(--size);
      }
    }

    &.bottom {
      bottom: 0;
      transform: translate(0, 100%);

      &.size {
        max-height: var(--size);
      }
    }
  }

  div.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(100, 100, 100, 0.5);
    opacity: 0;
    z-index: 2;
    transition: opacity var(--duration) ease;
  }

  &.open {
    z-index: 3;
    transition: z-index var(--duration) step-start;

    div.panel {
      transform: translate(0, 0);
    }

    div.overlay {
      opacity: 1;
    }
  }
}
</style>

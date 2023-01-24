<!--
Component: Drawer

A drawer panel that slides in and out.

Attributes:
 open       - Whether the drawer should be shown
 duration   - Time in seconds for the transition animation to play over
 placement  - Show the drawer either 'top', 'bottom', 'left' or 'right'
 size       - Width (or height) of the drawer in the axis it comes from

Events:
 clickAway  - Triggered when user clicks outside the panel


Derived from https://github.com/rsdavis/svelte-drawer (unlicensed)

Copyright (C) 2023 Jath Palasubramaniam

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
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

<script>
  import { onMount } from "svelte"

  export let fontSize = "1rem"
  export let minWidth = "0.1rem"
  export let placeholder = ""
  export let label = ""
  export let center = ""

  export let value

  let input
  let autoCenter = center ? true : false

  function grow(event) {
    event.target.parentNode.dataset.value = event.target.value || event.target.placeholder
  }

  function autoCenterOnBlur() {
    if (center) {
      autoCenter = true
    }
  }

  function autoUnCenterOnFocus() {
    if (center) {
      autoCenter = false
    }
  }

   onMount(() => {
     input.parentNode.dataset.value = input.value || input.placeholder
   })
</script>

<label style:font-size={fontSize} class:titled={label}>
  <span>{label}</span>
  <input
    type="text"
    bind:this={input}
    bind:value={value}
    on:input={grow}
    on:focus={autoUnCenterOnFocus}
    on:blur={autoCenterOnBlur}
    class:center={autoCenter}
    size="1"
    style:min-width={minWidth}
    {placeholder}
  />
</label>

<style lang="scss">
@use "$styles/variables" as *;

label {
  width: 100%;
  font: $primary-font;
  display: inline-grid;
  align-items: center;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  padding-left: 0.4em;
  padding-right: 0.4em;

  &::after,
  input {
    border: none;
    border-bottom-style: solid;
    border-width: 1px;
    border-color: $accent-color;
    grid-row-start: 1;
    grid-column-start: 1;
    font: inherit;
  }

  input.center {
    text-align: center;
  }

  &::after {
    content: attr(data-value) " ";
    visibility: hidden;
    white-space: pre-wrap;
  }

  &:focus-within {
    outline-style: solid;
    outline-width: 2px;
    outline-color: $background-accent-color;

    input:focus {
      outline: none;
    }
  }

  &.titled {
    &::after,
    input {
      grid-column-start: 2;
    }
  }
}
</style>

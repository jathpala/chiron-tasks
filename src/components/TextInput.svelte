<!--
Component: Text Input

Stylised input for a one line string

Attributes:
  fontSize     - CSS font size value
  minWidth     - CSS minimum width
  placeholder  - Placeholder text to show
  label        - Label to show for the input
  center       - If the text should be centered, specify "true"


Derived from https://codepen.io/shshaw/pen/bGNJJBE (MIT Licensed)

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
  font: $primary-font;
  display: grid;
  align-items: center;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  padding-left: 0.4em;
  padding-right: 0.4em;

  &::after,
  input {
    width: auto;
    border: none;
    border-bottom-style: solid;
    border-width: 1px;
    border-color: $accent-color;
    grid-row-start: 1;
    grid-column-start: 1;
    font: inherit;
    color: $primary-color;
  }

  input.center {
    text-align: center;
  }

  &::after {
    content: attr(data-value) " ";
    visibility: hidden;
    white-space: pre-wrap;
    overflow: hidden;
  }

  &:focus-within {

    input:focus {
      outline: none;
      border-bottom-width: 2px;
      margin-bottom: -1px;
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

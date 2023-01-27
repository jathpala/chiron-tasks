<!--
Component: Checkbox Input

Stylised input for a checkbox

Attributes:
  fontSize     - CSS font size value
  minWidth     - CSS minimum width
  minHeight    - CSS minimum height
  placeholder  - Placeholder text to show

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
  export let size = "1.8rem"
  export let label = ""

  export let checked = false

  function defocus(event) {
    event.target.blur()
  }
</script>

<label>
  <input type="checkbox" style:--size={size} bind:checked on:click={defocus} on:change>
  {label}
</label>

<style lang="scss">
@use "$styles/variables" as *;

label {
  font: $primary-font;
  font-weight: 600;
  display: flex;
  column-gap: 0.5rem;
  align-items: center;

  input {
    appearance: none;
    font: inherit;
    color: currentcolor;
    width: var(--size);
    height: var(--size);
    border-style: solid;
    border-color: currentcolor;
    border-width: 2px;
    border-radius: 50%;
    display: grid;
    align-content: center;
    justify-content: center;
    cursor: pointer;

    &::before {
      content: "";
      width: var(--size);
      height: var(--size);
      transform: scale(0.5);
      opacity: 0;
      transition: 120ms opacity ease-in-out;
      background-color: $accent-color;
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    }

    &:hover, &:focus {
      border-width: 4px;
      outline-style: none;
    }

    &:checked {
      &::before {
        opacity: 1;
      }
    }

    &:disabled {
      color: $primary-color;
      cursor: not-allowed;

      &:hover, &:focus {
        border-color: currentcolor;
        border-width: 2px;
      }
    }
  }
}

</style>

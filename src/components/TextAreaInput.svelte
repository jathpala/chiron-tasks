<!--
Component: Text Area Input

Stylised input for a text area

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
  export let fontSize = "1rem";
  export let minWidth = "10rem";
  export let minHeight = "5em"
  export let placeholder = "";

  export let value;
</script>

  <textarea
    style:font-size={fontSize}
    style:min-width={minWidth}
    style:min-height={minHeight}
    bind:value
    {placeholder}
  />

<style lang="scss">
@use "$styles/variables" as *;

textarea {
  width: 100%;
  font: $primary-font;
  color: $primary-color;
  resize: vertical;
  border-color: $accent-color;
  border-width: 1px;
  border-style: none;
  border-style: solid;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  padding-left: 0.4em;
  padding-right: 0.4em;
  border-radius: 0.2rem;


  &:focus {
    border-color: transparent;
    outline-style: solid;
    outline-color: $accent-color;
    outline-width: 2px;
  }
}
</style>

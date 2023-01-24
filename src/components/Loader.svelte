<!--
Component: Full Screen Loading Page

Displays a loading message when needed

Attributes:
  fontSize   - CSS font size value
  dotSize    - Size of the loading indicator dots
  topOffset  - How much to bring the dots up todays the loading message

Slots:
  (default)  - The loading message to display

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
  export let fontSize = "2rem"
  export let dotSize = "1rem"
  export let topOffset = "1.5em"
</script>

<div style:font-size={fontSize}>
  <slot />
  <span style:font-size={dotSize} style:top={"-" + topOffset}></span>
</div>

<style lang="scss">
@use "$styles/variables" as *;

div {
  font: $primary-font;
  color: $accent-color;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    color: $background-accent-color;
    transform: translateZ(0);
    position: relative;
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    animation-fill-mode: both;
    animation: loader 1.8s infinite ease-in-out;

    &:before {
      border-radius: 50%;
      width: 2.5em;
      height: 2.5em;
      animation-fill-mode: both;
      animation: loader 1.8s infinite ease-in-out;
      content: '';
      position: absolute;
      left: -3.5em;
      animation-delay: -0.2s;
    }

    &:after {
      border-radius: 50%;
      width: 2.5em;
      height: 2.5em;
      animation-fill-mode: both;
      animation: loader 1.8s infinite ease-in-out;
      content: '';
      position: absolute;
      left: 3.5em;
      animation-delay: 0.2s;
    }
  }
}

@keyframes loader {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>

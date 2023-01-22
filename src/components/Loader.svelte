<script>

export let fontSize = "2rem"
export let dotSize = "1rem"
export let topOffset = "1.5em"

</script>

<div style:font-size={fontSize}>
  <slot />
  <span class="loader" style:font-size={dotSize} style:top={"-" + topOffset}></span>
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

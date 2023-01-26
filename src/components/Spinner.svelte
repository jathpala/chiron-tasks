<script>
  export let show
</script>

<span class:show></span>

<style lang="scss">
@use "$styles/variables" as *;

span {
  width: 0.8em;
  height: 0.8em;
  border-width: 5px;
  border-style: solid;
  border-radius: 50%;
  border-color: transparent;
  border-bottom-color: transparent;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  &.show {
    border-color: $background-color;
    border-bottom-color: $accent-color;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

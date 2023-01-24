<script>
  import "$styles/main.scss"
</script>

<svelte:head>
  <title>Chiron Tasks</title>
</svelte:head>

<div>
  <slot />
</div>

<style lang="scss">
@use "$styles/variables" as *;

div {
  min-width: 360px;
}


</style>

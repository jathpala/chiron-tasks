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


  &:focus {
    border-color: transparent;
    outline-style: solid;
    outline-color: $background-accent-color;
    outline-width: 2px;
  }
}
</style>

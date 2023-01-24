<script>
  import { onMount } from "svelte"

  export let fontSize = "1rem"
  export let label = ""

  export let value = {}

  let dayValue = value.day || ""
  let dayInput
  let monthValue = value.month || ""
  let monthInput
  let yearValue = value.year || ""
  let yearInput

  $: {
    value.day = dayValue
    value.month = monthValue
    value.year = yearValue
    value = value
  }

  const currentYear = new Date().getFullYear()

  function handleInput(event) {
    event.target.parentNode.dataset.value = event.target.value || event.target.placeholder
  }

  function handleKeypress(event) {
    if ("1234567890".includes(event.key)) {
      // If updating number, check that it is a valid date
      // This validation only works if numbers are entered in sequence
      // Also doesn't work if highlighting text and hoping to overwrite
      // TODO: Use selection/cursor features to detect the above and fix
      if ((event.target === dayInput || event.target === monthInput) &&
          (event.target.value === "0" && event.key === "0")) {
        // Don't allow 00
        event.preventDefault()
        return
      }
      let newValue = parseInt(event.target.value + event.key)
      if ((event.target === dayInput && (newValue < 0 || newValue > 31)) ||
          (event.target === monthInput && (newValue < 0 || newValue > 12)) ||
          (event.target === yearInput && (newValue < 1 || newValue > currentYear))) {
        event.preventDefault()
        return
      }
      if ((event.target === yearInput) &&
          ((event.target.value.length == 2 &&
            (newValue < 190 || newValue > Math.floor(currentYear / 10))) ||
           (event.target.value.length == 3 && newValue < 1900))) {
        event.preventDefault()
        return
      }
      if (event.target === dayInput && newValue.toString().length === 2) {
        dayValue = newValue
        event.preventDefault()
        monthInput.focus()
        return
      }
      if (event.target === monthInput && newValue.toString().length === 2) {
        monthValue = newValue
        event.preventDefault()
        yearInput.focus()
        return
      }
    } else if (
      [
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Tab",
      ].includes(event.key)
    ) {
      // Allow the default action
      return
    } else if (event.key === "Backspace") {
      // Allow the default action
      return
    } else if (["/", "-", "."].includes(event.key)) {
      event.preventDefault();
      if (event.target === dayInput) {
        monthInput.focus()
        return
      } else if (event.target === monthInput) {
        yearInput.focus()
        return
      }
    } else {
      // Illegal key value
      event.preventDefault()
      return
    }
  }

  onMount(() => {
    dayInput.parentNode.dataset.value = dayInput.value || dayInput.placeholder
    monthInput.parentNode.dataset.value = monthInput.value || monthInput.placeholder
    yearInput.parentNode.dataset.value = yearInput.value || yearInput.placeholder
  })
</script>

<div class="wrapper" style:font-size={fontSize}>
  <span>{label}</span>
  <label class="day">
    <input
      type="number"
      bind:this={dayInput}
      bind:value={dayValue}
      on:input={handleInput}
      on:keydown={handleKeypress}
      min="1"
      max="31"
      step="1"
      size="1"
      placeholder="DD"
    />
  </label>
  <span class="divider">/</span>
  <label class="month">
    <input
      type="number"
      bind:this={monthInput}
      bind:value={monthValue}
      on:input={handleInput}
      on:keydown={handleKeypress}
      min="1"
      max="12"
      step="1"
      size="1"
      placeholder="MM"
    />
  </label>
  <span class="divider">/</span>
  <label class="year">
    <input
      type="number"
      bind:this={yearInput}
      bind:value={yearValue}
      on:input={handleInput}
      on:keydown={handleKeypress}
      min="1900"
      max="{currentYear}"
      step="1"
      size="1"
      placeholder="YYYY"
    />
  </label>
</div>


<style lang="scss">
@use "$styles/variables" as *;

div.wrapper {
  width: 100%;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  padding-left: 0.1em;
  padding-right: 0.1em;
  font: $primary-font;
  min-width: 7em;

  label {
    display: inline-grid;
    align-items: center;

    &::after,
    input {
      border: none;
      border-bottom-style: solid;
      border-width: 1px;
      border-color: $accent-color;
      min-width: 1em;
      grid-row-start: 1;
      grid-column-start: 2;
      font: inherit;
      appearance: textfield;
      text-align: center;
    }

    &::after {
      content: attr(data-value) " ";
      visibility: hidden;
      white-space: pre-wrap;
    }
  }

  &:focus-within {

    input:focus {
      outline: none;
      border-bottom-width: 2px;
      margin-bottom: -1px;
    }
  }
}

// Disable number spinners on chrome
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

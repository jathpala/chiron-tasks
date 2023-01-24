<script>
  import { createEventDispatcher } from "svelte"

  import { doc, updateDoc, serverTimestamp } from "firebase/firestore"

  import TextInput from "$components/TextInput.svelte"
  import DateInput from "$components/DateInput.svelte"
  import TextAreaInput from "$components/TextAreaInput.svelte"

  import { db } from "$lib/firebase"
  import { user } from "$stores/user"

  export let ref = null

  export let name = ""
  export let dob = {}
  export let mrn = ""
  export let summary = ""
  export let details = ""

  let todo
  let error = null

  const dispatch = createEventDispatcher()

  async function addTodo() {
    error = null
    if (name.trim() === "" && mrn.trim() === "") {
      if (summary.trim() === "") {
        error = "Must provide either name or MRN and a task summary"
      } else {
        error = "Must provide either name or MRN"
      }
      return
    } else {
      if (summary.trim() === "") {
        error = "Must provide a task summary"
        return
      }
    }

    dispatch("addTodo", {
      name: name,
      mrn: mrn,
      dob: dob,
      summary: summary,
      details: details,
      user: $user.firebase.uid,
      createdAt: serverTimestamp()
    })
    name = ""
    dob = {}
    mrn = ""
    summary = ""
    details = ""
    todo = todo
  }

  async function updateTodo() {
    error = null
    if (name.trim() === "" && mrn.trim() === "") {
      if (summary.trim() === "") {
        error = "Must provide either name or MRN and a task summary"
      } else {
        error = "Must provide either name or MRN"
      }
      return
    } else {
      if (summary.trim() === "") {
        error = "Must provide a task summary"
        return
      }
    }

    dispatch("updateTodo", {
      ref: ref,
      name: name,
      mrn: mrn,
      dob: dob,
      summary: summary,
      details: details,
    })
  }

  async function deleteTodo() {
    dispatch("deleteTodo", ref)
  }
</script>

<div class="todo" class:new={!ref} bind:this={todo}>
  {#if error}
    <div class="flash">{error}</div>
  {/if}
  <div class="grid">
    <span class="name">
      <TextInput bind:value={name} fontSize="1.4rem" placeholder="Name..." />
    </span>
    <span class="dob">
      <DateInput bind:value={dob} fontSize="1rem" />
    </span>
    <span class="mrn">
      <TextInput
        bind:value={mrn}
        fontSize="1rem"
        minWidth="2rem"
        center="true"
        placeholder="MRN: &#65343;&#65343;&#65343;&#65343;"
      />
    </span>
    <span class="summary">
      <TextInput
        bind:value={summary}
        fontSize="1.2rem"
        placeholder="Task..."
      />
    </span>
    <span class="details">
      <TextAreaInput
        bind:value={details}
        fontSize="1rem"
        placeholder="Details..."
      />
    </span>
    {#if ref}
      <span class="controls">
        <button type="button" name="delete" on:click|preventDefault={deleteTodo}>
          Delete
        </button>
        <button type="submit" name="update" on:click|preventDefault={updateTodo}>
          Update
        </button>
      </span>
    {:else}
      <span class="controls">
        <button type="submit" name="add" on:click|preventDefault={addTodo}>
          Add
        </button>
      </span>
    {/if}
    </div>
</div>


<style lang="scss">
@use "$styles/variables" as *;

div.todo {
  border-style: solid;
  border-width: 1px;
  border-color: $accent-color;
  width: 100%;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 1rem;

  div.grid {
    display: grid;
    grid-template-areas:
      "error error error"
      "name name name"
      "mrn dob ."
      "summary summary summary"
      "details details details"
      "controls controls controls";
    grid-template-columns:
      auto max-content 1fr;
    column-gap: 0.5rem;
    row-gap: 1rem;
    justify-content: stretch;
    align-content: stretch;

    span {
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      column-gap: 0.2rem;
      color: $accent-color;

      &.name {
        display: block;
        grid-area: name;
      }

      &.dob {
        grid-area: dob;

        &:before {
          content: "(";
        }

        &:after {
          content: ")";
        }
      }

      &.mrn {
        grid-area: mrn;
      }

      &.summary {
        display: block;
        grid-area: summary;
      }

      &.details {
        display: block;
        grid-area: details;
      }

      &.controls {
        grid-area: controls;
        justify-self: end;
        display: flex;
        column-gap: 1rem;

        button {
          font: $primary-font;
          font-size: 1.2rem;
          font-weight: 800;
          padding-top: 0.3em;
          padding-bottom: 0.3em;
          padding-left: 0.5em;
          padding-right: 0.5em;
          background-color: $background-color;
          color: $accent-color;
          border-width: 2px;
          border-style: solid;
          border-color: $accent-color;
          border-radius: 0.3em;

          &:hover {
            cursor: pointer;
            background-color: $accent-color;
            color: $background-color;
          }
        }
      }
    }
  }

  &.new {
    border-width: 2px;
    border-style: dashed;
  }

  div.flash {
    text-align: center;
    font-size: 1rem;
    color: $error-color;
    margin-bottom: 0.5rem;
  }
}

@media screen and (min-width: 768px) {
  div.todo {
    width: calc(768px - 2rem);

    div.grid {
      grid-template-areas:
        "name dob mrn ."
        "summary summary summary summary"
        "details details details details"
        "controls controls controls controls";
      grid-template-columns:
        auto max-content auto 1fr;

      span.mrn {

        &:before {
          content: "[";
        }

        &:after {
          content: "]";
        }
      }
    }
  }
}

@media screen and (min-width: 1024px) {

}
</style>

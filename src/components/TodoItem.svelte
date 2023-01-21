<script>
  import { createEventDispatcher } from "svelte"

  import { doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore"

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

  const dispatch = createEventDispatcher()

  async function addTodo() {
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
  }

  async function updateTodo() {
    try {
      await updateDoc(doc(db, "tasks", ref), {
        name: name,
        mrn: mrn,
        dob: dob,
        summary: summary,
        details: details,
      })
      console.log("Document updated with ID: ", ref)
    } catch (err) {
      console.error(err)
    }
  }

  async function deleteTodo() {
    try {
      await deleteDoc(doc(db, "tasks", ref))
      console.log("Document deleted with ID: ", ref)
      todo.parentNode.removeChild(todo)
    } catch (err) {
      console.error(err)
    }
  }
</script>

<div class="todo" class:new={!ref} bind:this={todo}>
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
      minWidth="30rem"
      placeholder="Task..."
    />
  </span>
  <span class="details">
    <TextAreaInput
      bind:value={details}
      fontSize="1rem"
      minWidth="30rem"
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


<style lang="scss">
@use "$styles/variables" as *;

div.todo {
  display: inline-grid;
  grid-template-areas:
    "name dob mrn ."
    "summary summary summary summary"
    "details details details details"
    "controls controls controls controls";
  grid-template-columns:
    max-content max-content max-content 1fr;
  column-gap: 0.5rem;
  row-gap: 1rem;
  justify-content: stretch;
  align-content: stretch;
  border-style: solid;
  border-width: 1px;
  border-color: $accent-color;
  width: fit-content;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 1rem;

  span {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    column-gap: 0.2rem;
    color: $accent-color;

    &.name {
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
      &:before {
        content: "[";
      }

      &:after {
        content: "]";
      }
    }

    &.summary {
      grid-area: summary;
    }

    &.details {
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

  &.new {
    border-width: 2px;
    border-style: dashed;
  }
}
</style>

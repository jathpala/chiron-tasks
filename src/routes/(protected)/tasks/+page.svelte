<!--
/tasks

Main view to show task list

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
  import { onMount } from "svelte"
  import { flip } from "svelte/animate"
  import { fade } from "svelte/transition"

  import { collection, doc, query, getDoc, getDocs, addDoc, updateDoc,
           deleteDoc, where, orderBy, serverTimestamp } from "firebase/firestore"
  import TodoItem from "$components/TodoItem.svelte"
  import { db } from "$lib/firebase"
  import { user } from "$stores/user"

  let todos = []
  let unique = {}

  async function readAll() {
    try {
      const q = query(
        collection(db, "tasks"),
        where("user", "==", $user.firebase.uid),
        orderBy("modifiedAt", "desc"),
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((d) => {
        let todo = d.data()
        todo.id = d.id
        todos.push(todo)
        todos = todos
      })
    } catch (err) {
      console.log(err)
    }
  }

  async function addTodo(event) {
    try {
      event.detail.user = $user.firebase.uid
      event.detail.isComplete = false
      event.detail.createdAt = serverTimestamp()
      event.detail.modifiedAt = serverTimestamp()
      const docRef = await addDoc(collection(db, "tasks"), event.detail)
      console.log("Document written with ID: ", docRef.id)
      const d = await getDoc(doc(db, "tasks", docRef.id))
      let todo = d.data()
      todo.id = d.id
      todos.unshift(todo)
      todos = todos
      unique = {}
    } catch (err) {
      console.error(err)
    }
  }

  async function completeTodo(event) {
    const ref = event.detail.ref
    delete event.detail.ref
    event.detail.status = "complete"
    event.detail.modifiedAt = serverTimestamp()
    try {
      await updateDoc(doc(db, "tasks", ref), event.detail)
      const index = todos.findIndex((todo) => todo.id == ref)
      todos[index] = event.detail
      todos[index].id = ref
      todos = todos

      console.log("Document updated with ID: ", ref)
    } catch (err) {
      console.error(err)
    }
  }

  async function updateTodo(event) {
    const ref = event.detail.ref
    delete event.detail.ref
    event.detail.modifiedAt = serverTimestamp()
    try {
      await updateDoc(doc(db, "tasks", ref), event.detail)
      const index = todos.findIndex((todo) => todo.id === ref)
      todos[index] = event.detail
      todos[index].id = ref
      todos = todos

      console.log("Document updated with ID: ", ref)
    } catch (err) {
      console.error(err)
    }
  }

  async function deleteTodo(event) {
    try {
      await deleteDoc(doc(db, "tasks", event.detail))
      console.log("Document deleted with ID: ", event.detail)
      todos = todos.filter((todo) => todo.id != event.detail)
    } catch (err) {
      console.error(err)
    }
  }

  async function toggleCompletion(event) {
    console.log("Completing..")
    try {
      await updateDoc(doc(db, "tasks", event.detail.ref), {
        isComplete: event.detail.isComplete
      })
      const index = todos.findIndex((todo) => todo.id === event.detail.ref)
      todos[index].isComplete = event.detail.isComplete
      todos = todos
    } catch (err) {
      console.log(err)
    }
  }

  onMount(() => {
    readAll()
  })
</script>

<main>
  {#key unique}
    <TodoItem on:addTodo={addTodo} />
  {/key}
  {#each todos as todo (todo.id)}
    <div transition:fade={{duration: 300}} animate:flip={{duration: 300}}>
      <TodoItem
        ref={todo.id}
        name={todo.name}
        mrn={todo.mrn}
        dob={todo.dob}
        summary={todo.summary}
        details={todo.details}
        isComplete={todo.isComplete}
        on:deleteTodo={deleteTodo}
        on:updateTodo={updateTodo}
        on:toggleCompletion={toggleCompletion}
      />
    </div>
  {/each}
</main>


<style lang="scss">
@use "$styles/variables" as *;

main {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  align-items: center;
}

div {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

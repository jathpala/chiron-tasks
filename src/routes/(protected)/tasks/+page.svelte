<script>
  import { onMount } from "svelte"
  import { flip } from "svelte/animate"
  import { fade } from "svelte/transition"

  import { collection, doc, query, getDoc, getDocs, addDoc, updateDoc, deleteDoc, where } from "firebase/firestore"

  import TodoItem from "$components/TodoItem.svelte"
  import { db } from "$lib/firebase"
  import { user } from "$stores/user"

  let todos = []
  let unique = {}

  async function readAll() {
    try {
      const q = query(collection(db, "tasks"), where("user", "==", $user.firebase.uid))
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

  async function updateTodo(event) {
    const ref = event.detail.ref
    delete event.detail.ref
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

  async function deleteTodo(event) {
    try {
      await deleteDoc(doc(db, "tasks", event.detail))
      console.log("Document deleted with ID: ", event.detail)
      todos = todos.filter((todo) => todo.id != event.detail)
    } catch (err) {
      console.error(err)
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
        on:deleteTodo={deleteTodo}
        on:updateTodo={updateTodo}
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

<script>
  import { onMount } from "svelte"

  import { collection, doc, query, getDoc, getDocs, addDoc, where } from "firebase/firestore"

  import TodoItem from "$components/TodoItem.svelte"
  import { db } from "$lib/firebase"
  import { user } from "$stores/user"

  let todos = []

  async function readAll() {
    try {
      const q = query(collection(db, "tasks"), where("user", "==", $user.firebase.uid))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((d) => {
        let todo = d.data()
        todo.id = d.id
        todos.push(todo)
      })
      todos = todos
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
    } catch (err) {
      console.error(err)
    }
  }

  onMount(() => {
    readAll()
  })
</script>

<main>
  <TodoItem on:addTodo={addTodo}/>
  {#each todos as todo (todo.id)}
    <TodoItem
      ref={todo.id}
      name={todo.name}
      mrn={todo.mrn}
      dob={todo.dob}
      summary={todo.summary}
      details={todo.details}
    />
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
</style>

<script>
  import { auth } from "$lib/firebase"
  import { goto } from "$app/navigation"
  import { signInWithEmailAndPassword } from "firebase/auth"

  let email
  let password
  let error

  // const auth = firebase.auth
  async function login() {
    error = null
    try {
      await signInWithEmailAndPassword(auth, email, password)
      goto("/tasks")
    } catch (err) {
      if (["auth/user-not-found", "auth/wrong-password"].some(
        substr => err.message.includes(substr)
      )) {
        error = "Invalid username/password"
      } else if (["auth/missing-email"].some(
        substr => err.message.includes(substr)
      )) {
        error = "Enter email and password"
      } else {
        error = "Problem with sign in"
        console.log(err.message)
      }
    }
  }
</script>

<section>
  <main>
    <h1>Chiron Tasks</h1>
    <form>
      {#if error}
      <span class="flash">{error}</span>
      {/if}
      <label for="email">Email</label>
      <input id="email" type="email" name="username" bind:value={email} required/>
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        bind:value={password}
        required
      />
      <button
        type="submit"
        on:click|preventDefault={login}>
        Sign In
      </button>
    </form>
  </main>
</section>

<style lang="scss">
@use "$styles/variables" as *;

section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  main {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    padding: 2rem;
    border-style: solid;
    border-width: 4px;
    border-color: $accent-color;
    border-radius: 1rem;
    outline-style: solid;
    outline-color: $background-color;
    outline-width: 0.5rem;
    box-shadow: 0 0 24px 12px rgba(0, 0, 0, 0.5);

    h1 {
      font: $brand-font;
      color: $brand-color;
      text-align: center;
    }

    form {
      display: flex;
      flex-direction: column;

      label {
        font-size: 1.6rem;
        margin-bottom: 0.2rem;

        &:after {
          content: ":";
        }
      }

      input {
        font: $primary-font;
        color: $primary-color;
        font-size: 1.4rem;
        margin-bottom: 1.4rem;
        height: 2em;
        margin-left: 0.2rem;
        margin-right: 0.2rem;
        width: 20rem;
      }

      button {
        font: $primary-font;
        font-size: 1.4rem;
        margin-top: 1rem;
        padding: 0.2rem;
        width: fit-content;
        align-self: center;
      }

      span.flash {
        text-align: center;
        font-size: 1.4rem;
        margin-bottom: 1.2rem;
        color: $error-color;
      }
    }
  }
}
</style>
